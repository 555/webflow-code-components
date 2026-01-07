# Webflow Code Components Quick Start Guide

This guide will walk you through importing React components into Webflow.

## Prerequisites

Before you begin, make sure you have:

- **Webflow account** - Workspace on Freelancer, Core, Growth, Agency, or Enterprise plan
- **Webflow site** for testing components
- **Node.js 20+** and **npm 10+** installed
- Basic knowledge of **React** and **TypeScript**

## Step 1: Create a React Project

Create a new React project using Create React App:

```bash
npx create-react-app code-components
cd code-components
```

## Step 2: Install Webflow CLI and Dependencies

Install the required Webflow packages:

```bash
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```

## Step 3: Create Webflow Configuration File

Create a `webflow.json` file in the root of your repository:

**webflow.json**
```json
{
    "library": {
        "name": "<Your Library Name>",
        "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"]
    }
}
```

- Give your library a name
- Specify the path to your code component files (files ending with `.webflow.js`, `.webflow.tsx`, etc.)

## Step 4: Add an Example Component to Your Library

Navigate to your `src` directory and create a new file called `Badge.tsx`:

**Badge.tsx**
```typescript
import * as React from "react";

interface BadgeProps {
  text: string;
  variant: 'Light' | 'Dark';
}

export const Badge = ({ text, variant }: BadgeProps) => (
  <span
    style={{
      backgroundColor: variant === 'Light' ? '#eee' : '#000',
      borderRadius: '1em',
      color: variant === 'Light' ? '#000' : '#fff',
      display: 'inline-block',
      fontSize: '14px',
      lineHeight: 2,
      padding: '0 1em',
    }}
  >
    {text}
  </span>
);
```

This creates a simple badge component with light and dark variants.

## Step 5: Define the Webflow Code Component

Create a code component definition file to map your React component to a Webflow component.

In your `src` directory, create `Badge.webflow.tsx`:

**Badge.webflow.tsx**
```typescript
import { Badge } from './Badge';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Badge, {
    name: 'Badge',
    description: 'A badge with variants',
    group: 'Info',
    props: {
        text: props.string({
            displayName: 'Text',
            defaultValue: 'Badge'
        }),
        variant: props.enum({
            displayName: 'Variant',
            options: ['Light', 'Dark'],
            defaultValue: 'Light'
        })
    }
});
```

Key elements:
- **Import your component** and Webflow utilities
- **Use `declareComponent`** to define the Webflow component
- **Define props** that will be configurable in Webflow
- **Specify metadata** like name, description, and group

## Step 6: Share Your Library to Webflow

Run the Webflow CLI command to share your library:

```bash
npx webflow library share
```

This command will:
1. Bundle your components
2. Upload them to Webflow
3. Make them available in your Webflow workspace

## Step 7: Use Your Component in Webflow

1. **Open your Webflow site** in the Designer
2. **Open the Libraries panel** (left sidebar)
3. **Find and install your library**
4. **Open the Components panel**
5. **Drag your Badge component** onto the page
6. **Customize the props** in the Properties panel

## Next Steps

- **Explore prop types** - Learn about all available prop types for more complex components
- **Configure bundling** - Understand how to configure bundling and imports
- **Work with frameworks** - Integrate with other libraries and frameworks
- **Learn component architecture** - Dive deeper into Webflow code component architecture

## Resources

- [Webflow Code Components Documentation](https://developers.webflow.com/code-components)
- [Component Architecture](https://developers.webflow.com/code-components/introduction/architecture)
- [Prop Type Reference](https://developers.webflow.com/code-components/reference/props)
- [Webflow CLI Reference](https://developers.webflow.com/code-components/reference/cli)

## Troubleshooting

- Make sure Node.js and npm versions meet the minimum requirements
- Verify that `webflow.json` is in the root directory
- Check that component definition files have the correct naming pattern (`.webflow.tsx`)
- Ensure you're logged into Webflow CLI with the correct account