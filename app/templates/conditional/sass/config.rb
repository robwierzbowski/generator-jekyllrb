# Require any additional compass plugins here
# example require 'extension'

# All preprocessors output expanded code
# Assets will be minified and revved on build by Grunt
environment = :development
output_style = :expanded
asset_cache_buster :none

# RWRW Should these dirs point to the .tmp or should they point to the jekyll app? How does contrib-compass work?
# Contrib Compass usually runs from gruntfile location.
# RWRW Question is shouldyo be able to pull jekyll site out of yeo and have it work with no alterations, or should the yeo site be clean?
## If it compiles direct, will css min etc still get to it?

# Directory settings, relative to config.rb (RWRW or GRUNTFILE?)
http_path = "/" # Set to the root of your project when deployed
sass_dir = "<%= cssPreDir %>"
css_dir = "_site/<%= cssDir %>"
images_dir = "<%= imgDir %>"
generated_images_dir = "_site/<%= imgDir %>/sprites"
javascripts_dir = "_site/%= jsDir %>"
extensions_dir = "components"

# Enable relative paths for Compass asset helpers
relative_assets = true

## RWRW Check for newest rec.
# To debug directly with FireSass or Chrome Web Inspector, pass options to Sass.
sass_options = (environment == :development && debug == true) ? {:debug_info => true} : {}
