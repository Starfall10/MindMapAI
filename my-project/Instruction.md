Anh gởi đề tài nhé:

Chủ đề: WebApp tương tác với LLM để tạo ra mindmap cơ bản từ chủ đề user cung cấp.

Kỹ thuật cần:

1. Front-end: NextJS, Tailwind CSS
2. Backend: API, sử dụng FastAPI (Python), hoặc Slim Framework PHP, chưa cần cơ chế Authentication
3. LLMs: tương tác với OpenAI api

Kiến thức:

- Hiểu biết về Front-end, Backend
- Cơ chế hoạt động của LLM
- Prompt Engineering

Mô tả kỹ thuật
Gởi input cho AI, nhận lại output mindmap
Sử dụng PlanUML để tạo hình mindmap với output từ AI, ví dụ: https://shorturl.at/j9BZ5
ReactJS Canvas via Konva, hiển thị hình mindmap, có drag, zoom in/out.
Cho edit lại nội dung mindmap và update lại hình mindmap

Mô tả flow:
HIển thị 1 input, user nhập: Plan a marketing campaign for a new board game mobile app in the Philippines. Include considerations about key messages, success metrics, and possible channels.
Bấm nút Generate
Gọi AI, trả về nội dung, generate ra hình MindMap, hiển thị trên Canvas

Nội dung chatGPT cho UI: https://chatgpt.com/share/994ec635-4ac4-4584-a033-e915d3b682fd

Anh note lại bổ sung thêm thêm phần lưu database nhé.
Mình sẽ cần tối thiểu 2 table, 1 chứa data input, 1 chứa log request (số token, cost,…)

---

You are a professional mind-map maker that can generate mind-maps for any possible topics.
Depending on the topic, I want you to return a mind-map in the form of a markdown with no indentation. The root node will be represented with a \*, it's child node will be represented with \*\*, and so on

---

@startmindmap

- Marketing Campaign for Board Game Mobile App in Philippines
  ** Key Messages \*** Fun and Engaging Gameplay
  **_ Connect with Friends and Family
  _** Unique Filipino Cultural Themes
  **\* Available on Android and iOS
  ** Success Metrics
  **_ Number of Downloads
  _** User Retention Rate
  **_ Average Session Duration
  _** User Ratings and Reviews
  **\* Social Media Engagement
  ** Possible Channels
  **\* Social Media
  \*\*** Facebook Ads \***\* Instagram Stories and Posts
  \*\*** TikTok Challenges \***_ YouTube Influencer Partnerships
  _** Online Communities \***\* Reddit
  \*\*** Local Gaming Forums \***_ Facebook Groups
  _** PR and Media \***\* Press Releases to Tech Blogs
  \*\*** Features in Filipino Lifestyle Magazines \***_ Radio Interviews
  _** In-App Promotions \***\* Referral Programs
  \*\*** In-App Event Announcements
  **\* Offline Channels
  \*\*** Collaboration with Local Cafes and Board Game Shops
  \*\*\*\* Posters and Flyers in Universities
  @endmindmap

---

mindmap
root((mindmap))
Origins
Long history
::icon(fa fa-book)
Popularisation
British popular psychology author Tony Buzan
Research
On effectiveness<br/>and features
On Automatic creation
Uses
Creative techniques
Strategic planning
Argument mapping
Tools
Pen and paper
Mermaid
