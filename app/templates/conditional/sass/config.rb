# If you're using global Compass extensions require them here
# example require 'extension'

# All preprocessors output expanded code
# Grunt handles minification and revs assets on build
environment = :development
output_style = :expanded
asset_cache_buster :none

# Directory settings, relative to config.rb
# Grunt handles sass, css, js, and image source and destination paths
http_path = "/" # Set to the root of your project when deployed
extensions_dir = "components"

# Enable relative paths for Compass asset helpers
relative_assets = true

## RWRW Check for newest rec.
# To debug directly with FireSass or Chrome Web Inspector, pass options to Sass.
sass_options = (environment == :development && debug == true) ? {:debug_info => true} : {}
