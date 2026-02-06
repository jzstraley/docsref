from mkdocs.config.base import Config
from mkdocs.config.config_options import ListOfItems, Type

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class FilterConfig(Config):
    """
    A filter configuration.
    """

    include = ListOfItems(Type(str), default = [])
    """
    Patterns to include.

    This list contains patterns that are matched against the value to filter.
    If the value matches at least one pattern, it will be included.
    """

    exclude = ListOfItems(Type(str), default = [])
    """
    Patterns to exclude.

    This list contains patterns that are matched against the value to filter.
    If the value matches at least one pattern, it will be excluded.
    """
