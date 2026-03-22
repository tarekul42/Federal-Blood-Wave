import re

with open("src/components/profile/profile.module.css", "r") as f:
    css = f.read()

replacements = {
    r"var\(--spacing-1\.5\)": "6px",
    r"var\(--spacing-2\.5\)": "10px",
    r"var\(--spacing-3\)": "12px",
    r"var\(--spacing-3\.5\)": "14px",
    r"var\(--spacing-5\)": "20px",
    r"var\(--spacing-10\)": "40px",
}

for pattern, repl in replacements.items():
    css = re.sub(pattern, repl, css)

with open("src/components/profile/profile.module.css", "w") as f:
    f.write(css)

print("CSS Fixed!")
