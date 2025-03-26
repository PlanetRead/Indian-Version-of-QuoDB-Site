# Indian Version of QuoDB Site

## Project Overview
The **Indian Version of QuoDB Site** is a web application that allows users to search for movie dialogues and quotes. Inspired by QuoDB, this project provides a database of popular Indian movie dialogues with a fast and user-friendly interface.

## Features
- Search for movie dialogues by keywords
- Browse a vast collection of quotes from Indian cinema
- Responsive and user-friendly interface
- Fast and efficient search functionality
- Open-source and community-driven project

## Installation & Setup
### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (v9.4.0 recommended)

### Steps to Set Up the Project Locally
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/Indian-Version-of-QuoDB-Site.git
   cd Indian-Version-of-QuoDB-Site
   ```

2. **Install dependencies**
   ```sh
   npm install -g pnpm  # If not already installed
   pnpm install
   ```

3. **Start the development server**`
   ```sh
   pnpm run dev
   ```
   The application should now be running at `http://localhost:3000/`.

## Project Structure
This project uses a **monorepo setup** with `turbo` for package management. Key configurations from `turbo.json`:
- **Build:** `pnpm run build` (Uses `turbo build`, dependent on previous builds)
- **Development:** `pnpm run dev` (Runs `turbo dev`, persistent mode enabled)
- **Linting:** `pnpm run lint` (Runs `turbo lint`, dependent on previous linting tasks)
- **Caching:** Turbo caches build outputs except `.next/cache/`
- **Global Dependencies:** The project relies on `**/.env.*local`

## Usage
- Open the web application in your browser.
- Enter a keyword or phrase in the search bar.
- Browse through search results and view matching dialogues.
- Click on a result to view more details about the movie.

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b branch name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the changes (`git push origin branch name`).
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any queries or suggestions, feel free to reach out via GitHub Issues.

---
Enjoy using the **Indian Version of QuoDB Site** and happy coding! 🎬

