import axios from 'axios';

/**
 * High-Concurrency Production Stress Test
 */
async function runStressTest() {
  const TARGET_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const CONCURRENT_USERS = 50; // Per batch
  const BATCHES = 10;
  
  console.log(`🚀 Starting Stress Test on: ${TARGET_URL}`);
  console.log(`📡 Simulating ${CONCURRENT_USERS * BATCHES} total requests...`);

  let successCount = 0;
  let failureCount = 0;
  const start = Date.now();

  for (let b = 0; b < BATCHES; b++) {
    const batchPromises = Array.from({ length: CONCURRENT_USERS }).map(async () => {
      try {
        // Test high-traffic endpoints
        await axios.get(`${TARGET_URL}/api/election-results`); // Polling mock
        await axios.get(TARGET_URL); // Home page
        successCount++;
      } catch (error) {
        failureCount++;
      }
    });

    await Promise.all(batchPromises);
    console.log(`✅ Batch ${b + 1}/${BATCHES} completed...`);
  }

  const duration = (Date.now() - start) / 1000;
  console.log(`\n📊 TEST RESULTS:`);
  console.log(`⏱️ Duration: ${duration.toFixed(2)}s`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failures: ${failureCount}`);
  console.log(`🚀 RPS: ${(successCount / duration).toFixed(2)}`);

  if (failureCount > 0) {
    console.error("⚠️ STRESS TEST WARNING: Failures detected. Check database connection limits.");
  } else {
    console.log("💎 STRESS TEST PASSED: System is production-stable.");
  }
}

runStressTest();
