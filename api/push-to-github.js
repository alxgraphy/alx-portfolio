export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { configData } = req.body;
  const githubToken = process.env.GITHUB_TOKEN;
  const repo = 'alxgraphy/alx-portfolio'; // Update with your repo name

  try {
    // 1. Get current config.json file
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/src/config.json`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    
    const fileData = await getFileResponse.json();
    
    // 2. Update the config.json file
    const updateResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/src/config.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update portfolio content via admin panel',
          content: Buffer.from(JSON.stringify(configData, null, 2)).toString('base64'),
          sha: fileData.sha
        })
      }
    );

    if (updateResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully pushed to GitHub! Vercel will deploy in ~30 seconds.' 
      });
    } else {
      const error = await updateResponse.json();
      throw new Error(error.message || 'GitHub API error');
    }
  } catch (error) {
    console.error('GitHub push error:', error);
    return res.status(500).json({ 
      error: 'Failed to push to GitHub', 
      details: error.message 
    });
  }
}
