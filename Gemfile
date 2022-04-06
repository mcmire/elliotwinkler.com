source "https://rubygems.org"

git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.0"

gem "middleman", github: "mcmire/middleman", branch: "patches--rebased-20220405"
gem "middleman-blog"
gem "middleman-livereload"
gem "middleman-s3_sync", github: "mcmire/middleman-s3_sync", branch: "fixes-for-ruby-3-2-0"
gem "mime-types"

# For feed.xml.builder
gem "builder"

gem "bourbon"
gem "bitters"
gem "haml"
gem "kramdown"
gem "kramdown-parser-gfm"
# gem "pry-byebug"   # This is causing issues
gem "puma"
gem "rack-contrib"
gem "redcarpet", ">= 3.3.3", "< 4.0"
gem "sass"
gem "svg_optimizer"
