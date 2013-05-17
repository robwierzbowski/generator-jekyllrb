# Compass configuration for a Yeoman Jekyll project

# Note: Grunt handles most Compass configuration. If you set something here and
# it doesn't work, check if it has been set in the Gruntfile.

# Bust cache with a query string or custom path.
# Grunt and Jekyll need this to be ':none'
asset_cache_buster :none

# Globally installed extensions
# require 'extension'

# Ad-hoc extensions
extensions_dir = "app/bower_components"

# Development output style
output_style = :expanded

# Pass fancy options to Sass
# Debug directly with Chrome Web Inspector. May not play nicely with some
# Compass extensions. TODO: Replace with :sourcemap when available in Compass
sass_options = {:debug_info => true}
