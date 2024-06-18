require("dotenv").config({ path: __dirname + "/.env.dailygithub" });
const { TwitterClient } = require("./client.js");
import {
  getMostTrendingRepoWeekly,
  getMostTrendingRepoDaily,
} from "./github.js";

class TwitterBot {
  constructor() {
  }

  async weeklyTweet() {
    try {
      const repos = await getMostTrendingRepoWeekly();
      for (const repo of repos) {
        const repo_url = repo.html_url;
        const repo_description = repo.description;
        const repo_language = repo.language;
        const repo_stars = repo.stargazers_count;
        const repo_forks = repo.forks_count;
        if (
          repo_url &&
          repo_description &&
          repo_language &&
          repo_stars &&
          repo_forks &&
          repo_description <= 60
        ) {
          await this.twitterClient.v2.tweet({
            text: `🌟 The most starred repo of the week!\n🔗 ${repo_url}\n📝 Description: ${repo_description}\n🔠 Language: ${repo_language}\n⭐ Stars: ${repo_stars}\n🍴 Forks: ${repo_forks}`,
          });
          break; // Tweet only one repo
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async oneOfTheMostDaily() {
    try {
      const repos = await getMostTrendingRepoDaily();
      for (const repo of repos) {
        const repo_url = repo.html_url;
        const repo_description = repo.description;
        const repo_language = repo.language;
        const repo_stars = repo.stargazers_count;
        const repo_forks = repo.forks_count;

        if (
          repo_url &&
          repo_description &&
          repo_language &&
          repo_stars &&
          repo_forks &&
          repo_description <= 60
        ) {
          console.log(repos.indexOf(repo));
          await this.twitterClient.v2.tweet({
            text: `🌟 One of the most starred repo of the day!\n🔗 ${repo_url}\n📝 Description: ${repo_description}\n🔠 Language: ${repo_language}\n⭐ Stars: ${repo_stars}\n🍴 Forks: ${repo_forks}`,
          });
          break; // Tweet only one repo
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

const bot = new TwitterBot();
bot.weeklyTweet();
bot.oneOfTheMostDaily();

oneOfTheMostDaily();
