from html.parser import HTMLParser

# TODO: Refactor the `void` set into a common module and import it from there
# and not from the search plugin.
from material.plugins.search.plugin import void

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Readtime parser
class ReadtimeParser(HTMLParser):

    # Initialize parser
    def __init__(self):
        super().__init__(convert_charrefs = True)

        # Tags to skip
        self.skip = set([
            "object",                  # Objects
            "script",                  # Scripts
            "style",                   # Styles
            "svg"                      # SVGs
        ])

        # Current context
        self.context = []

        # Keep track of text and images
        self.text   = []
        self.images = 0

    # Called at the start of every HTML tag
    def handle_starttag(self, tag, attrs):
        # Collect images
        if tag == "img":
            self.images += 1

        # Ignore self-closing tags
        if tag not in void:
            # Add tag to context
            self.context.append(tag)

    # Called for the text contents of each tag
    def handle_data(self, data):
        # Collect text if not inside skip context
        if not self.skip.intersection(self.context):
            self.text.append(data)

    # Called at the end of every HTML tag
    def handle_endtag(self, tag):
        if self.context and self.context[-1] == tag:
            # Remove tag from context
            self.context.pop()
