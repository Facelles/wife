import { defineStore } from 'pinia'

export const usePointsStore = defineStore('points', {
  state: () => ({
    points: 0,
    history: [],
    rewards: [
      { id: 1, name: 'Movie Night', points: 100, description: 'Choose a movie to watch together' },
      { id: 2, name: 'Date Night', points: 200, description: 'Plan a special date night' },
      { id: 3, name: 'Massage', points: 150, description: 'Get a relaxing massage' },
    ]
  }),

  getters: {
    totalPoints: (state) => state.points,
    pointsHistory: (state) => state.history,
    availableRewards: (state) => state.rewards.filter(reward => state.points >= reward.points)
  },

  actions: {
    addPoints(amount, description) {
      this.points += amount
      this.history.push({
        id: Date.now(),
        amount,
        description,
        timestamp: new Date().toISOString()
      })
    },

    redeemReward(rewardId) {
      const reward = this.rewards.find(r => r.id === rewardId)
      if (reward && this.points >= reward.points) {
        this.points -= reward.points
        return true
      }
      return false
    }
  }
}) 