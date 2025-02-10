const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        console.warn(`Retry attempt ${i + 1} failed. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    return { error: "Max retries reached" };
  };
  
  const circuitBreaker = {
    failureCount: 0,
    threshold: 5,
    notifyFailure: function () {
      this.failureCount++;
      console.error(`Circuit breaker failure count: ${this.failureCount}`);
  
      if (this.failureCount >= this.threshold) {
        console.error("⚠️ Circuit breaker activated! Too many failures.");
      }
    },
  };
  
  module.exports = { retryWithBackoff, circuitBreaker };
  