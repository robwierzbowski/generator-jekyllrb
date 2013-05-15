# If you're using global Compass extensions require them here
# example require 'extension'

# All preprocessors output expanded code
# Grunt handles minification and asset cache busting on build
environment = :development
output_style = :expanded
asset_cache_buster :none

# Directory settings, relative to config.rb
http_path = "/" # Set to the root of your project when deployed
# These directories are required for Grunt integration
sass_dir = 'app/<%= cssPreDir %>'
css_dir = '.tmp/<%= cssDir %>'
javascripts_dir = 'app/<%= jsDir %>'
images_dir = 'app/<%= imgDir %>'
http_images_path = '/<%= imgDir %>'
# You can edit the sprite path
generated_images_dir = '.tmp/<%= imgDir %>/sprites'
http_generated_images_path = '/<%= imgDir %>/sprites'

# Load ad-hoc compass extensions from the Bower components directory
extensions_dir = "app/components"

# Disable relative paths for Compass asset helpers
relative_assets = false

# Pass fancy options to Sass
# Debug directly with Chrome Web Inspector. May not play nicely with some
# Compass extensions. TODO: Replace with :sourcemap when available in Compass
sass_options = {:debug_info => true}
