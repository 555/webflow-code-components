# Multi-Workspace Setup

This repository is configured to publish to multiple Webflow workspaces from a single codebase.

## Workspaces

- **LimeKnight** (default) - `.env.limeknight`
- **StudioTonic** - `.env.studiotonic`

## Setup Instructions

### 1. Configure StudioTonic Token

Edit `.env.studiotonic` and replace `YOUR_STUDIOTONIC_TOKEN_HERE` with your actual token:

1. Go to StudioTonic workspace in Webflow
2. Navigate to: **Workspace Settings** → **Apps & Integrations** → **Workspace API Access**
3. Click **Generate API Token**
4. Copy the token and paste it into `.env.studiotonic`

### 2. Publish to Workspaces

Use these npm scripts to publish:

```bash
# Publish to LimeKnight (default)
npm run publish
# or
npm run publish:limeknight

# Publish to StudioTonic
npm run publish:studiotonic

# Publish to BOTH workspaces
npm run publish:both
```

## How It Works

Each workspace has its own `.env` file:
- `.env.limeknight` - LimeKnight workspace token
- `.env.studiotonic` - StudioTonic workspace token
- `.env` - Active workspace (auto-generated, gitignored)

When you run a publish script, it:
1. Copies the workspace-specific `.env` file to `.env`
2. Builds the components
3. Publishes to that workspace using `npx webflow library share`

## Security

All `.env` files are gitignored and will NOT be committed to the repository. Keep your tokens secure!

## Notes

- Both workspaces receive the same component library
- Changes made to components are published to whichever workspace you target
- Use `publish:both` to keep both workspaces in sync
