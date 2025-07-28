# Password Guesser - Farcaster Mini App

A challenging password guessing game where you must meet specific requirements to unlock each level. Can you crack all the rules?

## 🎮 Game Features

- **Progressive Rule Checking**: Rules are checked one by one as you progress
- **Real-time Feedback**: See which rules you've passed and which one you're currently working on
- **Multiple Themes**: Beautiful color schemes to choose from
- **Mobile Optimized**: Works perfectly on mobile devices and Farcaster Mini Apps

## 🚀 Deployment

### Deploy to Vercel

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/yourusername/password-guesser.git
   cd password-guesser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

4. **Set your custom domain** (optional but recommended)
   - Go to your Vercel dashboard
   - Add a custom domain like `password-guesser.yourdomain.com`

## 📱 Publishing as Farcaster Mini App

### 1. Verify Manifest Configuration

**Test your manifest accessibility:**
```bash
curl -s https://yourdomain.com/.well-known/farcaster.json
```

**Expected output:**
```json
{
  "miniapp": {
    "version": "1",
    "name": "Password Guesser",
    "iconUrl": "https://yourdomain.com/icon.svg",
    "homeUrl": "https://yourdomain.com/mini",
    "splashImageUrl": "https://yourdomain.com/splash.svg",
    "splashBackgroundColor": "#0052f",
    "subtitle": "Test your password skills",
    "description": "A challenging password guessing game where you must meet specific requirements to unlock each level. Can you crack all the rules?",
    "primaryCategory": "games",
    "tags": ["password", "game", "puzzle", "challenge", "security"],
    "heroImageUrl": "https://yourdomain.com/hero.svg",
    "tagline": "Crack the password rules",
    "ogTitle": "Password Guesser",
    "ogDescription": "Test your password skills with this challenging guessing game",
    "ogImageUrl": "https://yourdomain.com/og.svg"
  }
}
```

### 2. Update the Manifest URLs

```json
{
  "miniapp": {
    "version": "1",
    "name": "Password Guesser",
    "iconUrl": "https://yourdomain.com/icon.svg",
    "homeUrl": "https://yourdomain.com/mini",
    "splashImageUrl": "https://yourdomain.com/splash.svg",
    "splashBackgroundColor": "#0052f",
    "subtitle": "Test your password skills",
    "description": "A challenging password guessing game where you must meet specific requirements to unlock each level. Can you crack all the rules?",
    "primaryCategory": "games",
    "tags": ["password", "game", "puzzle", "challenge", "security"],
    "heroImageUrl": "https://yourdomain.com/hero.svg",
    "tagline": "Crack the password rules",
    "ogTitle": "Password Guesser",
    "ogDescription": "Test your password skills with this challenging guessing game",
    "ogImageUrl": "https://yourdomain.com/og.svg"
  }
}
```

### 2. Verify Your Domain

1. **Deploy your app** to a stable domain
2. **Test the manifest** by visiting `https://yourdomain.com/.well-known/farcaster.json`
3. **Ensure all image URLs are accessible**

### 3. Create Hosted Manifest (Recommended)

1. Visit [Farcaster Developer Tools](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Enter your domain and app details
3. You'll receive a hosted manifest ID
4. Update your `next.config.ts` to redirect to the hosted manifest:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapp/hosted-manifest/YOUR_MANIFEST_ID',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 4. Verify App Ownership

1. Use the **Mini App Manifest Tool** in Warpcast
2. Generate a signed account association
3. Add the `accountAssociation` property to your manifest
4. This makes you eligible for **Warpcast Developer Rewards**

### 5. Test Embed Metadata

**Verify embed tags are present:**
```bash
curl -s https://yourdomain.com/mini | grep -E 'fc:miniapp|fc:frame'
```

**Expected output:**
```html
<meta name="fc:miniapp" content='{"version":"1","imageUrl":"...","button":{...}}' />
```

### 6. Test in Preview Tool

1. **Encode your URL:**
   ```bash
   encoded_url=$(python3 -c "import urllib.parse; print(urllib.parse.quote('https://yourdomain.com/mini'))")
   echo "https://farcaster.xyz/~/developers/mini-apps/preview?url=$encoded_url"
   ```

2. **Open the preview URL** to test your Mini App

### 7. Post-Check Verification

After deployment, verify:
1. **Manifest is accessible:** `curl -s https://yourdomain.com/.well-known/farcaster.json`
2. **Embed preview works:** Share a link in Farcaster client
3. **App launches correctly:** Click the embed to open the Mini App
4. **No console errors:** Check browser console for SDK issues

## 🎨 Customization

### Adding New Rules

Edit `src/lib/rules.ts` to add new password validation rules:

```typescript
export const rules: Rule[] = [
  {
    id: "length",
    name: "Must be at least 8 characters",
    description: "Your password needs to be at least 8 characters long",
    validate: (password: string) => password.length >= 8,
  },
  // Add more rules here...
];
```

### Customizing Themes

Edit `src/lib/themes.ts` to modify the color schemes:

```typescript
export const themes: Theme[] = [
  {
    id: 'base',
    name: 'Base Fellowship',
    colors: {
      primary: '#0052f',
      // ... other colors
    },
    gradients: {
      background: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    },
  },
  // Add more themes...
];
```

## 📱 Mini App vs Web App

- **Web App**: Visit `/` for the full experience with theme switcher
- **Mini App**: Visit `/mini` for the optimized Farcaster Mini App experience

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

MIT License - feel free to use this project for your own Mini Apps!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you need help with deployment or have questions about Farcaster Mini Apps, check out the [official documentation](https://miniapps.farcaster.xyz/docs/guides/publishing).
