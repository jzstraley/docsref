from mkdocs.config.config_options import Type
from mkdocs.config.base import Config

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Meta plugin configuration
class MetaConfig(Config):
    enabled = Type(bool, default = True)

    # Settings for meta files
    meta_file = Type(str, default = ".meta.yml")
