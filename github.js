class GitHubAPI {
    constructor() {
        this.date = new Date();
        this.todaysDateMinusOne = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);
        this.todaysDateMinusSeven = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7);
    }

    formatDate(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    async getMostTrendingRepoDaily() {
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=created:>${this.formatDate(this.todaysDateMinusOne)}&sort=stars&order=desc`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async getMostTrendingRepoWeekly() {
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=created:>${this.formatDate(this.todaysDateMinusSeven)}&sort=stars&order=desc`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const gitHubAPI = new GitHubAPI();
export default gitHubAPI;