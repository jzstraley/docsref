from mkdocs.config.base import Config
from mkdocs.config.config_options import Optional, Type

from .options import PostDate, PostLinks, UniqueListOfItems

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Post configuration
class PostConfig(Config):
    authors = UniqueListOfItems(Type(str), default = [])
    categories = UniqueListOfItems(Type(str), default = [])
    date = PostDate()
    draft = Optional(Type(bool))
    links = Optional(PostLinks())
    readtime = Optional(Type(int))
    slug = Optional(Type(str))
