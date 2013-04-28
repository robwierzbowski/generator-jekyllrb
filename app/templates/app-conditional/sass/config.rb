# Require any additional compass plugins here
# example require 'extension'

# All preprocessors output expanded code
# Assets will be minified and revved on build by Grunt
environment = :development
output_style = :expanded
asset_cache_buster :none

# Directory settings, relative to config.rb
http_path = "/" # Set to the root of your project when deployed

## Process RWRW pre
sass_dir = "_scss"
## Process RWRW scaf
css_dir = "_site/css"
## Process RWRW scaf
images_dir = "img"
## Process RWRW scaf
generated_images_dir = "_site/img/sprites"
## Process RWRW scaf
javascripts_dir = "_site/js"
extensions_dir = "components"

# Enable relative paths for Compass asset helpers
relative_assets = true

## RWRW Check for newest rec.
# To debug directly with FireSass or Chrome Web Inspector, pass options to Sass.
sass_options = (environment == :development && debug == true) ? {:debug_info => true} : {}
