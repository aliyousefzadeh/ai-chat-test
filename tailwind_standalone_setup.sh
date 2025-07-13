# Create a folder for binaries if not exists
mkdir -p ~/.local/bin

# Download latest standalone Tailwind CLI binary for Linux (x64)
curl -s -o ~/.local/bin/tailwindcss \
  -L https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64

# Make it executable
chmod +x ~/.local/bin/tailwindcss

# Optionally add ~/.local/bin to PATH if not already set
grep -q 'export PATH="$HOME/.local/bin:$PATH"' ~/.bashrc || \
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

# Apply the updated PATH now
export PATH="$HOME/.local/bin:$PATH"

# Check that it works
tailwindcss -v
