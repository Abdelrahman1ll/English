import os
import re

root_dir = 'src/components'

patterns = [
    (re.compile(r'>Study</span>'), '>Study Mode</span>'),
    (re.compile(r'>Grid</span>'), '>Grid View</span>'),
    (re.compile(r'Study</button>'), 'Study Mode</button>'),
    (re.compile(r'Grid</button>'), 'Grid View</button>'),
    (re.compile(r'>Study Mode Mode</span>'), '>Study Mode</span>'), # Prevent double Mode
    (re.compile(r'>Grid View View</span>'), '>Grid View</span>')
]

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in patterns:
                new_content = pattern.sub(replacement, new_content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {path}")
