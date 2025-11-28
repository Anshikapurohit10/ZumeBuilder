
// export function analyzeATS(resumeText, role = "", jdText = "") {
//   resumeText = resumeText.toLowerCase();

  
//   const ROLE_KEYWORDS = {
//     "frontend developer": [
//       "javascript", "react", "html", "css", "tailwind",
//       "bootstrap", "ui", "ux",
//       "responsive", "frontend"
//     ],

//     "backend developer": [
//       "node", "express", "mongodb", "mysql", "api", "rest api",
//       "jwt", "authentication", "authorization", "server",
//       "database", "orm"
//     ],

//     "full stack developer": [
//       "javascript", "react", "node", "express", "mongodb",
//       "mysql", "redux", "api", "git", "github", "docker"
//     ],

//     "data analyst": [
//       "python", "sql", "excel", "tableau", "power bi",
//       "pandas", "numpy", "data analysis", "visualization",
//       "statistics", "eda", "data cleaning", "data mining"
//     ],

//     "ui ux designer": [
//       "figma", "wireframe", "prototype", "ui", "ux",
//       "design system", "user research", "adobe xd",
//       "interaction design", "visual design"
//     ],

//     "teacher": [
//       "lesson planning", "classroom management", "curriculum",
//       "communication", "assessment", "teaching", "educator",
//       "student engagement", "pedagogy"
//     ],

//     "medical": [
//       "patient care", "diagnosis", "treatment", "medical",
//       "clinical", "healthcare", "first aid", "emergency care",
//       "medical assessment", "medical records"
//     ],

//     "sports coach": [
//       "fitness", "training", "discipline", "sportsmanship",
//       "team coordination", "coaching", "athletics"
//     ],

//     "fitness trainer": [
//       "workout planning", "strength training", "cardio",
//       "nutrition", "exercise science", "fitness assessment"
//     ]
//   };

  
//   const TECH_SKILLS = [
//     "javascript", "react", "node", "express", "mongodb",
//     "mysql", "tailwind", "html", "css", "git", "github",
//     "api", "rest", "jwt"
//   ];

  
//   const SOFT_SKILLS = [
//     "communication", "teamwork", "leadership",
//     "problem solving", "creativity", "time management"
//   ];

  
//   const EDUCATION = [
//     "btech", "b.tech", "bachelor", "engineering",
//     "computer science", "information technology"
//   ];

  
//   const EXPERIENCE = ["internship", "experience", "company", "worked"];

  
//   const ACHIEVEMENTS = [
//     "project", "award", "achievement", "certificate",
//     "case study", "research"
//   ];

  
//   role = role?.toLowerCase().trim();
//   let roleKeywords = [];

//   if (ROLE_KEYWORDS[role]) {
//     roleKeywords = ROLE_KEYWORDS[role];
//   } else if (jdText) {
//     roleKeywords = jdText
//       .toLowerCase()
//       .split(/[\s,.\n]/)
//       .filter((w) => w.length >= 4)
//       .slice(0, 25); // top keywords from JD
//   }

 
// function matchKeywords(list) {
//   const matched = list.filter((k) => {
//     const regex = new RegExp("\\b" + k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\b", "i");
//     return regex.test(resumeText);
//   });

//   const missing = list.filter((k) => !matched.includes(k));

//   return {
//     matched: matched.map(cap),
//     missing: missing.map(cap),
//   };
// }

// function cap(word) {
//   return word.charAt(0).toUpperCase() + word.slice(1);
// }

//   const roleResult = matchKeywords(roleKeywords);

// const techResult = role ? matchKeywords(roleKeywords) : matchKeywords(TECH_SKILLS);

//   const softResult = matchKeywords(SOFT_SKILLS);
//   const eduResult = matchKeywords(EDUCATION);
//   const expResult = matchKeywords(EXPERIENCE);
//   const hasProject = /project|projects|developed|built|created/i.test(resumeText);
// const hasAchievement = /award|certificate|certified|achievement/i.test(resumeText);

// const achievementResult = {
//   matched: hasProject || hasAchievement ? ["Projects / Achievements"] : [],
//   missing: hasProject || hasAchievement ? [] : ["Projects / Achievements"]
// };




// let roleMatch = ""; 
// let score = 0;

// if (role === "frontend developer") {
//   roleMatch = "Frontend Developer";
//   score =
//     roleResult.matched.length * 5 +     // Frontend skills VERY important
//     techResult.matched.length * 3 +
//     softResult.matched.length * 1 +
//     eduResult.matched.length * 2;
// } else if (role === "backend developer") {
//   roleMatch = "Backend Developer";
//   score =
//     roleResult.matched.length * 5 +      // Backend skills VERY important
//     techResult.matched.length * 2 +
//     softResult.matched.length * 1 +
//     eduResult.matched.length * 2;
// } else if (role === "full stack developer") {
//   roleMatch = "Full Stack Developer";
//   score =
//     roleResult.matched.length * 4 +
//     techResult.matched.length * 4 +
//     softResult.matched.length * 2 +
//     eduResult.matched.length * 2;
// } else if (role === "teacher") {
//   roleMatch = "Teacher";
//   score =
//     roleResult.matched.length * 5 +
//     softResult.matched.length * 4 +
//     eduResult.matched.length * 3 +
//     techResult.matched.length * 1;
// } else if (role === "medical") {
//   roleMatch = "Medical";
//   score =
//     eduResult.matched.length * 5 +
//     roleResult.matched.length * 4 +
//     softResult.matched.length * 2 +
//     techResult.matched.length * 1;
// } else if (role === "sports coach" || role === "fitness trainer" || role === "sports") {
//   roleMatch = "Sports / Coach";
//   score =
//     roleResult.matched.length * 5 +
//     softResult.matched.length * 3 +
//     eduResult.matched.length * 2 +
//     techResult.matched.length * 1;
// } else if (role === "data analyst") {
//   roleMatch = "Data Analyst";
//   score =
//     roleResult.matched.length * 5 +
//     techResult.matched.length * 3 +
//     achievementResult.matched.length * 2 +
//     eduResult.matched.length * 2;
// } else {
//   // fallback generic scoring
//   roleMatch = role || "General";
//   score =
//     roleResult.matched.length * 4 +
//     techResult.matched.length * 2 +
//     softResult.matched.length * 2 +
//     eduResult.matched.length * 2;
// }

// // Fresher bonus (no penalty)
// if (expResult.matched.length === 0) {
//   score += 10;
// } else {
//   score += expResult.matched.length * 1;
// }

// const finalScore = Math.min(98, Math.max(40, score));
 

// // If NO skill matched → score must be 0
// const totalMatchedSkills =
//   roleResult.matched.length +
//   techResult.matched.length +
//   softResult.matched.length +
//   eduResult.matched.length +
//   achievementResult.matched.length;

// if (totalMatchedSkills === 0) {
//   return {
//     totalScore: 0,
//     roleMatch: role || "Unknown",
//     sections: {
//       role: roleResult,
//       tech: techResult,
//       soft: softResult,
//       education: eduResult,
//       experience: expResult,
//       achievements: achievementResult,
//     },
//     suggestions: [
//       "No matching skills found for the selected role.",
//       "Add relevant role-based, technical, soft skills and education details.",
//     ],
//   };
// }


// return {
//   totalScore: finalScore,
//   roleMatch,            // <-- new helpful field
//   sections: {
//     role: roleResult,
//     tech: techResult,
//     soft: softResult,
//     education: eduResult,
//     experience: expResult,
//     achievements: achievementResult,
//   },
//   suggestions: [
//     ...roleResult.missing.map((x) => `Missing role-required skill: ${x}`),
//     ...techResult.missing.map((x) => `Add technical skill: ${x}`),
//     ...softResult.missing.map((x) => `Improve soft skill: ${x}`),
//     ...eduResult.missing.map((x) => `Add education detail: ${x}`),
//     ...achievementResult.missing.map((x) => `Add project/achievement: ${x}`)
    
//   ],
  
// };
// }
export function analyzeATS(resumeText, role = "", jdText = "") {
  resumeText = resumeText.toLowerCase();

  // ---------------------- ROLE BASED SKILLS ----------------------
  const ROLE_KEYWORDS = {
    "frontend developer": [
      "javascript", "react", "html", "css", "tailwind",
      "bootstrap", "ui", "ux", "responsive", "frontend"
    ],
    "backend developer": [
      "node", "express", "mongodb", "mysql", "api", "rest api",
      "jwt", "authentication", "authorization", "server", "database", "orm"
    ],
    "full stack developer": [
      "javascript", "react", "node", "express", "mongodb",
      "mysql", "redux", "api", "git", "github", "docker"
    ],
    "data analyst": [
      "python", "sql", "excel", "tableau", "power bi",
      "pandas", "numpy", "data analysis", "visualization",
      "statistics", "eda", "data cleaning", "data mining"
    ],
    "ui ux designer": [
      "figma", "wireframe", "prototype", "ui", "ux",
      "design system", "user research", "adobe xd",
      "interaction design", "visual design"
    ],
    "teacher": [
      "lesson planning", "classroom management", "curriculum",
      "communication", "assessment", "teaching", "educator",
      "student engagement", "pedagogy"
    ],
    "medical": [
      "patient care", "diagnosis", "treatment", "medical",
      "clinical", "healthcare", "first aid", "emergency care",
      "medical assessment", "medical records"
    ],
    "sports coach": [
      "fitness", "training", "discipline", "sportsmanship",
      "team coordination", "coaching", "athletics"
    ],
    "fitness trainer": [
      "workout planning", "strength training", "cardio",
      "nutrition", "exercise science", "fitness assessment"
    ]
  };

  // ---------------------- GENERIC SKILLS ----------------------
  const SOFT_SKILLS = [
    "communication", "teamwork", "leadership",
    "problem solving", "creativity", "time management"
  ];
  const EDUCATION = [
    "btech", "b.tech", "bachelor", "engineering",
    "computer science", "information technology"
  ];
  const EXPERIENCE = ["internship", "experience", "company", "worked"];
  const ACHIEVEMENTS = [
    "project", "award", "achievement", "certificate",
    "case study", "research"
  ];

  // ---------------------- ROLE KEYWORDS ----------------------
  role = role?.toLowerCase().trim();
  let roleKeywords = [];
  if (ROLE_KEYWORDS[role]) {
    roleKeywords = ROLE_KEYWORDS[role];
  } else if (jdText) {
    roleKeywords = jdText
      .toLowerCase()
      .split(/[\s,.\n]/)
      .filter((w) => w.length >= 4)
      .slice(0, 25);
  }

  // ---------------------- MATCH FUNCTION ----------------------
  function matchKeywords(list) {
    const matched = list.filter((k) => {
      const regex = new RegExp("\\b" + k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\b", "i");
      return regex.test(resumeText);
    });
    const missing = list.filter((k) => !matched.includes(k));
    return { matched: matched.map(cap), missing: missing.map(cap) };
  }
  function cap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const roleResult = matchKeywords(roleKeywords);
  const techResult = role ? matchKeywords(roleKeywords) : matchKeywords([]);
  const softResult = matchKeywords(SOFT_SKILLS);
  const eduResult = matchKeywords(EDUCATION);
  const expResult = matchKeywords(EXPERIENCE);

  // ---------------------- PROJECT & CERTIFICATE CHECK ----------------------
  const PROJECT_KEYWORDS = ["project","projects","clone","portfolio","application","app","website","system","developed","built"];
  const CERTIFICATE_KEYWORDS = ["certificate","certification","certified","course","training","udemy","coursera","nptel"];
  function hasKeywords(keywords){ return keywords.some(k=>resumeText.includes(k)); }
  let projectFound = hasKeywords(PROJECT_KEYWORDS);
  let certificateFound = hasKeywords(CERTIFICATE_KEYWORDS);
  const achievementResult = {
    matched: projectFound || certificateFound ? ["Projects / Achievements"] : [],
    missing: projectFound || certificateFound ? [] : ["Projects / Achievements"]
  };

  // ---------------------- SCORE LOGIC ----------------------
  let roleMatch = role || "General";
  let score = 0;

  switch(role){
    case "frontend developer":
      roleMatch = "Frontend Developer";
      score = roleResult.matched.length*5 + techResult.matched.length*3 + softResult.matched.length*1 + eduResult.matched.length*2;
      break;
    case "backend developer":
      roleMatch = "Backend Developer";
      score = roleResult.matched.length*5 + techResult.matched.length*2 + softResult.matched.length*1 + eduResult.matched.length*2;
      break;
    case "full stack developer":
      roleMatch = "Full Stack Developer";
      score = roleResult.matched.length*4 + techResult.matched.length*3 + softResult.matched.length*2 + eduResult.matched.length*2;
      break;
    case "teacher":
      roleMatch = "Teacher";
      score = roleResult.matched.length*5 + softResult.matched.length*4 + eduResult.matched.length*3 + techResult.matched.length*1;
      break;
    case "medical":
      roleMatch = "Medical";
      score = eduResult.matched.length*5 + roleResult.matched.length*4 + softResult.matched.length*2 + techResult.matched.length*1;
      break;
    case "sports coach":
    case "fitness trainer":
    case "sports":
      roleMatch = "Sports / Coach";
      score = roleResult.matched.length*5 + softResult.matched.length*3 + eduResult.matched.length*2 + techResult.matched.length*1;
      break;
    case "data analyst":
      roleMatch = "Data Analyst";
      score = roleResult.matched.length*5 + techResult.matched.length*3 + achievementResult.matched.length*2 + eduResult.matched.length*2;
      break;
    default:
      score = roleResult.matched.length*4 + techResult.matched.length*2 + softResult.matched.length*2 + eduResult.matched.length*2;
  }

  // Fresher bonus & experience
  if(expResult.matched.length===0) score += 10; else score += expResult.matched.length*1;

  // Project + certificate bonus
  if(projectFound) score += 12;
  if(certificateFound) score += 8;

  const finalScore = Math.min(90, Math.max(10, score));

  // Zero-skill protection
  const totalMatchedSkills = roleResult.matched.length + techResult.matched.length + softResult.matched.length + eduResult.matched.length + achievementResult.matched.length;
  if(totalMatchedSkills===0){
    return {
      totalScore:0,
      roleMatch,
      sections:{role:roleResult, tech:techResult, soft:softResult, education:eduResult, experience:expResult, achievements:achievementResult},
      suggestions:[
        "No matching skills found for the selected role.",
        "Add relevant role-based, technical, soft skills and education details."
      ]
    }
  }

  // ---------------------- SUGGESTIONS ----------------------
  let suggestions = [
    ...roleResult.missing.map((x)=>`Missing role-required skill: ${x}`),
    ...techResult.missing.map((x)=>`Add technical skill: ${x}`),
    ...softResult.missing.map((x)=>`Improve soft skill: ${x}`),
    ...eduResult.missing.map((x)=>`Add education detail: ${x}`),
    ...achievementResult.missing.map((x)=>`Add project/achievement: ${x}`)
  ];
  if(!projectFound) suggestions.push("Add at least one technical project.");
  if(!certificateFound) suggestions.push("Add relevant certifications.");
  suggestions = suggestions.map(s => s.charAt(0).toUpperCase() + s.slice(1));

  // ---------------------- FINAL RETURN ----------------------
  return {
    totalScore: finalScore,
    roleMatch,
    sections:{role:roleResult, tech:techResult, soft:softResult, education:eduResult, experience:expResult, achievements:achievementResult},
    suggestions
  };
}
