import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { Resend } from "resend";

dotenv.config();

// Import experience data to ground the chatbot
import { experiencesData } from "./src/data/experiences";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to get project images
  app.get("/api/projects/:projectId/images", (req, res) => {
    const { projectId } = req.params;
    
    const projectFolderMap: Record<string, string> = {
      "seller-pod": "projects/seller-pod",
      "turkey-chicken-feet": "projects/turkey-chicken-feet",
      "hn-sim": "ảnh dự án sim du lịch",
      "zoo-restaurant": "ảnh dự án nhà hàng"
    };

    const folderName = projectFolderMap[projectId];
    if (!folderName) {
      return res.status(404).json({ error: "Project not found" });
    }

    const folderPath = path.join(process.cwd(), "public", folderName);
    
    try {
      if (!fs.existsSync(folderPath)) {
        return res.json({ images: [] });
      }
      
      const files = fs.readdirSync(folderPath);
      const images = files
        .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
        .sort((a, b) => {
          if (a.includes('photo_2026-05-05_10-11-21 (2)')) return -1;
          if (b.includes('photo_2026-05-05_10-11-21 (2)')) return 1;
          if (a.includes('z8018874731733')) return -1;
          if (b.includes('z8018874731733')) return 1;
          return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        })
        .map(file => `/${folderName}/${file}`);
        
      return res.json({ images });
    } catch (error) {
      console.error("Error reading project images:", error);
      return res.status(500).json({ error: "Failed to read images" });
    }
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "RESEND_API_KEY is not configured in the server settings." });
      }

      const resend = new Resend(apiKey);
      
      const { data, error } = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'tdbnhanhl@gmail.com',
        subject: `New Message from Portfolio: ${subject}`,
        html: `
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\\n/g, '<br>')}</p>
        `
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(500).json({ error: error.message || "Failed to send email" });
      }

      return res.json({ success: true, data });
    } catch (error: any) {
      console.error("Contact API Error:", error);
      return res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // API Route for Gemini Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in your Settings > Secrets panel." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Grounding prompt with details about Tran Dinh Bao Nhan
      const groundingPrompt = `
You are an intelligent, professional, and friendly AI Assistant representing Trần Đình Bảo Nhân.
Your job is to help recruiters, potential partners, and website visitors learn about Nhân's background, achievements, work experience, and skillset.

Here is the authentic, verified information about Trần Đình Bảo Nhân:

---
GENERAL BIO:
- Name: Trần Đình Bảo Nhân
- Role: E-commerce Specialist & Business Development (BD)
- Motto: "Kết nối công nghệ với giá trị kinh doanh." (Connecting technology with business value)
- Character: High Growth Mindset, Data-Driven, adaptable, committed to absolute quality.

KEY ACHIEVEMENTS (Thành tích nổi bật):
1. F&B Entrepreneurship: Founded and operated "Chân Gà Turkey" in Da Nang. Maintained 50-80 orders/day, 80-120 customers/day. Achieved monthly revenue of 70M - 100M VND, breaking even and turning profitable within just 1.5 months. Leveraged organic TikTok/Facebook content (viral video marketing) with millions of views without advertising budget.
2. E-commerce POD: Worked as an eBay US Seller at Green E Media. Specialized in niche market research, Print On Demand (POD), writing SEO listings (Cassini search optimization), pricing strategies, and maintaining Top Rated/Above Standard account health with delayed shipping rate < 1.5%. Increased organic traffic by 35%.
3. Sim Du Lịch Quốc Tế H&N: Worked as a Warehouse & Sales Manager. Managed over 50 SIM/eSIM SKUs. Packed 200-300 orders/day, handled over 80,000 orders with error rate under 0.1%. Doubled warehouse capacity through color-coded sorting.
4. Shift Manager at 2,3Zoo Restaurant: Managed 8-12 staff under extreme pressure (400 customers), promoted to Shift Manager in 6 months. Created onboarding handbook.

SKILLS & TOOLSETS:
- E-commerce: eBay US, Etsy, POD, Product Listing Optimization, SEO Listing, Fulfillment (Printify, etc.)
- Data Analysis: Microsoft Excel (Data processing), SQL (Queries), Financial & cost reporting.
- Business Development: Strategic planning, budget management, hiring & training, problem-solving.
- Digital Marketing & SEO: Organic social media (FB, TikTok), SEO copywriting.
- Coding: HTML, CSS, JavaScript (basic).
- Tool Ecosystem: Excel, Canva, CapCut, VS Code, GitHub, ChatGPT, Claude, Gemini, Perplexity, Zik Analytics, eBay Terapeak, Keepa, EverBee, eRank.

EXPERIENCE DETAILS:
${JSON.stringify(experiencesData, null, 2)}
---

INSTRUCTIONS FOR THE CONVERSATION:
1. Answer in Vietnamese (default) or match the visitor's language. Be extremely polite, professional, warm, and helpful.
2. Base your answers strictly on the facts provided above. If asked about something not in his portfolio or resume, politely state that you do not have that information but invite them to contact Nhân directly via the contact form or info provided on the website. Do NOT make up any experiences, technical skills, or credentials.
3. Keep answers concise, beautiful, and well-formatted in markdown. Avoid long-winded paragraphs; use bullet points for lists.
4. Encourage recruiters to reach out or look at the Portfolio tab.
5. Refer to Nhân as "anh Nhân" or "Nhân" in the third person, and refer to yourself as his AI Assistant.
`;

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: groundingPrompt,
        }
      });

      // Simple history loading to provide conversational memory
      if (history && Array.isArray(history)) {
        // Only load the last 6 messages to stay fast and avoid token bloat
        const limitedHistory = history.slice(-6);
        for (const turn of limitedHistory) {
          if (turn.role === "user" && turn.text) {
            await chat.sendMessage({ message: turn.text });
          }
        }
      }

      const response = await chat.sendMessage({ message: message });
      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      return res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // Force download for PDF files
  app.get("/*.pdf", (req, res, next) => {
    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(req.path)}"`);
    res.setHeader("Content-Type", "application/pdf");
    next();
  });

  // Serve static assets in production or use Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
