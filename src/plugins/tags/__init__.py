from .structure.mapping import Mapping
from .structure.tag import Tag

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

# Return tag name for sorting
def tag_name(tag: Tag, *args):
    return tag.name

# Return casefolded tag name for sorting
def tag_name_casefold(tag: Tag, *args):
    return tag.name.casefold()

# -----------------------------------------------------------------------------

# Return item title for sorting
def item_title(mapping: Mapping):
    # Note that this must be coerced to a string, as the title might be sourced
    # from metadata, which can be of any type - see https://t.ly/1AXyo
    return str(mapping.item.title)

# Return item URL for sorting
def item_url(mapping: Mapping):
    return mapping.item.url
