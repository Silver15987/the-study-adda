# How to Deploy to Netlify

You have two main options to deploy this project to Netlify:

## Option 1: Drag & Drop (Quickest)
1. **Build the Project**:
   Open your terminal and run:
   ```bash
   npm run build
   ```
   This will create a `dist` folder in your project directory.

2. **Upload**:
   - Go to [Netlify Drop](https://app.netlify.com/drop).
   - Drag and drop the entire `dist` folder into the upload area.
   - Your site will be live instantly!

## Option 2: Continuous Deployment via Git (Recommended)
1. **Push to GitHub/GitLab**:
   - Create a repository on GitHub.
   - Push your code:
     ```bash
     git remote add origin <your-repo-url>
     git push -u origin master
     ```

2. **Connect to Netlify**:
   - Log in to Netlify.
   - Click **"Add new site"** > **"Import from an existing project"**.
   - Select GitHub and choose your repository.

3. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - Click **"Deploy Site"**.

Now, every time you push changes to Git, Netlify will automatically rebuild and deploy your site.
