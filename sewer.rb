#!/usr/bin/env ruby

require 'bundler/setup'
require 'optparse'
require 'yaml'
require 'json'
require 'erb'
require 'date'
require 'redcarpet'
require 'fileutils'
require 'kronic'

options = {}

OptionParser.new do |opts|
  opts.banner = "Facilitates easy writing to my website.\nUsage: sewer [thought|post|wiki|build|publish] object"
end.parse!

# Switches what logic is run (keeps it all in one command)
verb = ARGV[0]
object = ARGV[1]
# There is a state maintained for facilitating auto-creating stuff without me worrying about it
# TODO: If these json's get out of hand, can switch to database tables.
@webstate = JSON.load(File.open("./webstate.json"))
@thoughts = JSON.load(File.open("./_src/thoughts.json"))

# Thoughts are to encourage me to spit out one-liner
# comments on the terminal, as a sort of micro-twitter.
#
# ex: sewer thought "Man, I'm drunk!"
if verb == 'thought' then
  now = Time.now
  title = now.strftime('%Y%m%d%H%M')
  @thoughts[title] = {
    time: now,
    text: object
  }
  File.open("./_src/thoughts.json","w") do|f|
    f.write(JSON.pretty_generate(@thoughts))
  end
end

# Blogs are more fleshed out and so get stored in proper files.
# These files have frontmatter made available as @vars in the markdown via erb escaping.
# The title should be terse and use spaces between titleized words
#
# ex: sewer blog "My New Campaign"
# ex: sewer blog I_Am_Paranoid_About_Spaces
if verb == 'post' then
  now = Time.now
  @title = "#{object}"
  @time = now
  target_path = "#{@webstate['post_directory']}/#{now.strftime('%Y%m%d%H%M')}_#{object.gsub(" ","_")}.md"
  IO.write(
    target_path,
    ERB.new(File.read("./_src/_templates/post.yaml.erb")).result()
  )
  puts target_path
end

# Wiki pages are registered in a graph, and can reference each other through special links.
# On site build, these links are reified.
#
# ex: sewer wiki "Kyahidan Biology"
def wikiname(title)
  title.gsub(" ","_").downcase
end

if verb == 'wiki' then
  now = Time.now
  @title = "#{object}"
  @time = now
  target_path = "#{@webstate['wiki_directory']}/#{wikiname(object)}.md"
  IO.write(
    target_path,
    ERB.new(File.read("./_src/_templates/wiki.yaml.erb")).result()
  )
  puts target_path
end

def interpret_markdown_file(source_path)
  document = File.read(source_path)
  # Extract the frontmatter
  splits = document.split("---\n")
  raise "Needs frontmatter with at least a blank line after it: #{source_path}" if splits.size < 3
  frontmatter = YAML.load(splits[1])
  # Extract the markdown
  markdown = splits[2...splits.size].join("---\n")
  # Interpret the unreified markdown as an erb
  # note: makes the frontmatter available to the templater as instance variables
  frontmatter.each {|k,v| instance_variable_set("@#{k}", v)} if frontmatter
  erb = ERB.new(markdown).result()
  # Find wiki-style links and make them into HTML links
  links = []
  erb.gsub!(/\[\[(.*)\]\]\((.*)\)/) do
    links << wikiname($1)
    "[#{$1}](/wiki/#{wikiname($2)}.html)"
  end
  erb.gsub!(/\[\[(.*)\]\]/) do
    links << wikiname($1)
    "[#{$1}](/wiki/#{wikiname($1)}.html)"
  end
  frontmatter[:links] = links if frontmatter
  # Generate the HTML of the reified markdown
  html = Redcarpet::Markdown.new(Redcarpet::Render::HTML.new).render(erb)
  return {frontmatter: frontmatter, markdown: markdown, erb: erb, html: html, source_path: source_path, name: File.basename(source_path,'.md')}
end

def write_to_website(contents, destination)
    # That's just the 'meat' of the file. 
    # We need to put it in a frame to add header/footer/nav elements
    # The original md file can specify an alternate frame than the default if desired.
    template = "./_src/_templates/page.html.erb"
    template = contents[:frontmatter]['template'] if contents[:frontmatter] && contents[:frontmatter]['template']
    @contents = contents[:html]
    final = ERB.new(File.read(template)).result()
    # Safely write to file
    FileUtils.mkdir_p(File.dirname(destination))
    IO.write(destination, final)
end

# Builds the website
if verb == 'build' then
  FileUtils.rm_rf(Dir.glob("./_bin/*"), secure:true)
  path = "#{@webstate['post_directory']}/#{@webstate['featured_post']}"
  # Publish posts, with next/previous support
  @featured_post = interpret_markdown_file(path)
  @posts = {}
  Dir.glob("./_src/posts/*.md").sort.tap do |post_sequence|
    post_sequence.each_with_index do |path, idx|
      puts "Building #{path}"
      post = interpret_markdown_file(path)
      @reader = post && post[:frontmatter] && post[:frontmatter]['type'] == 'post'
      @posts[post[:name]] = post
      @previous_post = "/posts/#{File.basename(post_sequence[idx-1],'.md')}.html" if idx > 0 && @reader
      @next_post = "/posts/#{File.basename(post_sequence[idx+1],'.md')}.html" if idx < post_sequence.size-1 && @reader
      write_to_website(post, post[:source_path].gsub(".md",".html").gsub("_src","_bin"))
      @previous_post = nil
      @next_post = nil
      @reader = false
    end
  end
  # Create root-level pages
  Dir.glob("./_src/*.md").each do |md_file|
    puts "Building #{md_file}"
    destination = md_file.gsub(".md",".html").gsub("_src","_bin")
    write_to_website(interpret_markdown_file(md_file), destination)
  end
  # Populate the Arcade: copies everything over, as well as turns md's into html's
  FileUtils.cp_r(Dir.glob("./_src/arcade"), "./_bin/")
  @games = []
  Dir.glob("./_bin/arcade/**/*.md") do |md_file|
    next if md_file == './_bin/arcade/index.md'
    @games << md_file
  end
  puts "Games: #{@games}"
  Dir.glob("./_bin/arcade/**/*.md") do |md_file|
    puts "Building #{md_file}"
    destination = md_file.gsub(".md",".html")
    write_to_website(interpret_markdown_file(md_file), destination)
    FileUtils.rm(md_file)
  end
  # Build the Wiki: builds the md's into html's and spits out a summary of stubs and dead links
  @links = {}
  Dir.glob("./_src/wiki/**/*.md") do |md_file|
    puts "Building #{md_file}"
    @reader = true
    destination = md_file.gsub(".md",".html").gsub("_src","_bin")
    interpreted_markdown_file = interpret_markdown_file(md_file)
    @links[interpreted_markdown_file[:frontmatter]['title']] = interpreted_markdown_file[:frontmatter]['links']
    write_to_website(interpreted_markdown_file, destination)
    @reader = false
  end
  # Copy over css
  FileUtils.cp_r(Dir.glob("./_src/assets"), "./_bin")
  # Copy _bin to root (stupid github requirement)
  FileUtils.cp_r(Dir.glob("./_bin/*"), ".")
  FileUtils.rm_rf(Dir.glob("./_bin"))
end

# Makes the most recent post the featured post
#
# ex: sewer bump_post
if verb == 'bump_post' then
  # TODO: fix this before the year 2100
  @webstate['featured_post'] = File.basename(Dir.glob("./_src/posts/20*.md").sort.last)
  File.open("./webstate.json","w") do|f|
    f.write(JSON.pretty_generate(@webstate))
  end
end

# Generates a hexagram for your fortune
#
# ex: sewer fortune
if verb == 'fortune' then
  LINES = {
    9 => "========= * ",
    8 => "=========",
    7 => "===   ===",
    6 => "===   === * "
  }
  GRAMS = {
    "sss" => "Chi'en",
    "ssw" => "Tui",
    "sww" => "Chen",
    "sws" => "Li",
    "www" => "K'un",
    "wsw" => "K'an",
    "wss" => "Sun",
    "wws" => "K'en",  
  }
  casts = 6.times.collect{ 3.times.collect{ rand() >= 0.5 ? 3: 2 }.sum }
  top = GRAMS[casts[3..5].collect{|e| e==7 || e==6 ? "w" : "s"}.join("")]
  bottom = GRAMS[casts[0..2].collect{|e| e==7 || e==6 ? "w" : "s"}.join("")]

  puts casts.collect {|e| LINES[e]}.reverse.join("\n")
  puts "#{top} over #{bottom}"
end

# Does the work of moving the _bin folder to the remote host and deploying to the web
#
# ex: sewer publish
if verb == 'publish' then
  `git add -u; git commit -m "Publish (#{object})"; git push origin master`
end
