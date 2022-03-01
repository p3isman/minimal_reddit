const BASE_URL = 'https://reddit.com/';

export const RedditAPI = {
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
    return json[1].data.children.map(comment => comment.data);
  }
};
