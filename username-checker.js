const puppeteer = require('puppeteer');
 
 // Function to generate random 2-letter and 3-letter usernames
 function generateUsernames(count, length) {
     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
         const usernames = new Set();
          
              while (usernames.size < count) {
                      let username = '';
                              for (let i = 0; i < length; i++) {
                                          username += chars.charAt(Math.floor(Math.random() * chars.length));
                                                  }
                                                          usernames.add(username);
                                                              }
                                                               
                                                                   return Array.from(usernames);
                                                                   }
                                                                    
                                                                    // Function to check if a username is available
                                                                    async function checkUsername(username, browser) {
                                                                        const page = await browser.newPage();
                                                                            const url = `https://guns.lol/${username}`;
                                                                             
                                                                                 try {
                                                                                         await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
                                                                                          
                                                                                                  const pageContent = await page.evaluate(() => document.body.innerText);
                                                                                                   
                                                                                                           if (pageContent.includes("This user is not claimed")) {
                                                                                                                       console.log(`✅ Available: ${username}`);
                                                                                                                                   return username;
                                                                                                                                           } else {
                                                                                                                                                       console.log(`❌ Taken: ${username}`);
                                                                                                                                                                   return null;
                                                                                                                                                                           }
                                                                                                                                                                               } catch (error) {
                                                                                                                                                                                       console.log(`⚠️ Error checking ${username}: ${error.message}`);
                                                                                                                                                                                               return null;
                                                                                                                                                                                                   } finally {
                                                                                                                                                                                                           await page.close();
                                                                                                                                                                                                               }
                                                                                                                                                                                                               }
                                                                                                                                                                                                                
                                                                                                                                                                                                                // Main function to check multiple usernames
                                                                                                                                                                                                                async function findAvailableUsernames() {
                                                                                                                                                                                                                    const browser = await puppeteer.launch({ headless: true });
                                                                                                                                                                                                                     
                                                                                                                                                                                                                         const usernamesToCheck = [
                                                                                                                                                                                                                                 ...generateUsernames(5, 2), // 5 random 2-letter usernames
                                                                                                                                                                                                                                         ...generateUsernames(5, 3)  // 5 random 3-letter usernames
                                                                                                                                                                                                                                             ];
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                  console.log("🔍 Checking usernames...");
                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                       const availableUsernames = [];
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                            for (const username of usernamesToCheck) {
                                                                                                                                                                                                                                                                    const available = await checkUsername(username, browser);
                                                                                                                                                                                                                                                                            if (available) availableUsernames.push(available);
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                     await browser.close();
                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                          console.log("\n🎯 **Available Usernames:**");
                                                                                                                                                                                                                                                                                              console.log(availableUsernames.length > 0 ? availableUsernames.join(', ') : "No available usernames found.");
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                               // Run the script
                                                                                                                                                                                                                                                                                               findAvailableUsernames();