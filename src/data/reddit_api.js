const BASE_URL = 'https://www.reddit.com/';

export const redditAPI = {
  async getSubreddits() {
    const response = await fetch(`${BASE_URL}subreddits.json`);
    const json = await response.json();
    return json.data.children.map(subreddit => subreddit.data);
  },

  async getPostsBySubreddit(subreddit) {
    const response = await fetch(`${BASE_URL}${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map(post => post.data);
  },

  async getPostComments(postURL) {
    const response = await fetch(`${BASE_URL}${postURL}.json`);
    const json = await response.json();
    let comments = json[1].data.children.map(comment => comment.data);
    // Last comment needs to be removed
    comments.pop();
    return comments;
  }
};
