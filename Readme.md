# benchmark-express-hono

This repository contains the code and setup for a performance benchmark comparing the throughput of two popular web framework/runtime combinations:

1.  **Express.js** running on **Node.js**
2.  **Hono** with **Open Zod OpenAPI** running on **Bun**

The primary goal of this benchmark is to investigate and verify performance claims, particularly Hono's assertion of being significantly faster than Express. The benchmark is designed to simulate a "real-world" scenario, accounting for differences in typical production environments (Node.js for Express, Bun for Hono) and including a more complex routing setup with 100 "trap" API routes to test routing efficiency under load.

## Project Structure

The repository likely contains:

* **`express-server/`**: The Express.js application code, typically configured to run on Node.js.
* **`hono-server/`**: The Hono application code, designed to run on the Bun runtime.
* **`package.json`**: For both servers, defining dependencies (e.g., `express`, `hono`, `better-sqlite3`, `bun-sqlite`) and benchmark scripts.
* **Benchmark Scripts**: Defined in `package.json` (e.g., `autocannon` commands) to run the performance tests.
* **SQLite Database**: Likely used by both applications (e.g., `better-sqlite3` for Express, `bun:sqlite` for Hono) for data operations.

## Benchmark Methodology

The benchmark utilizes `autocannon` to send 100 concurrent requests over 10 seconds to various API endpoints for both Express and Hono.

**HTTP Methods Tested:**

* GET `/api/items/:id`
* POST `/api/items`
* PUT `/api/items/:id`
* DELETE `/api/items/:id`

A key aspect of this benchmark is the inclusion of **100 "trap" API routes** on the root path (`/`). This setup is intended to simulate applications with a larger number of defined routes, assessing the routing overhead under pressure.

## Getting Started

To replicate the benchmark:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aymoun95/benchmark-express-hono.git
    cd benchmark-express-hono
    ```
2.  **Install Node.js and Bun:** Ensure you have both runtimes installed on your system.
    * Node.js: [https://nodejs.org/](https://nodejs.org/)
    * Bun: [https://bun.sh/](https://bun.sh/)
3.  **Install dependencies for Express.js (Node.js):**
    ```bash
    cd express-server
    npm install
    ```
4.  **Install dependencies for Hono (Bun):**
    ```bash
    cd hono-server
    bun install
    ```
5.  **Run the Express.js server:**
    ```bash
    cd express-server
    npm run dev
    ```
6.  **Run the Hono server:**
    ```bash
    cd hono-server
    bun run dev
    ```
7.  **Run Benchmarks (in a separate terminal for each):**
    Ensure one server is running at a time (e.g., stop Express server before starting Hono, or ensure they use different ports).

    ```bash
    # Example for Express GET benchmark
    npm run benchmark:1 # (from the express-server directory)

    # Example for Hono GET benchmark
    bun run benchmark:1 # (from the hono-server directory)

    # Refer to package.json scripts for specific commands like:
    # "benchmark:1": "autocannon -c 100 -d 10 http://localhost:3000/api/items/1",
    # "benchmark:2": "autocannon -c 100 -d 10 -m POST -H 'content-type=application/json' -b '{\"name\": \"benchmark\"}' http://localhost:3000/api/items",
    # "benchmark:3": "autocannon -c 100 -d 10 -m PUT -H 'content-type=application/json' -b '{\"name\": \"benchmark\"}' http://localhost:3000/api/items/2",
    # "benchmark:4": "autocannon -c 100 -d 10 -m DELETE http://localhost:3000/api/items/3"
    ```

## Results and Analysis

The benchmark results, as discussed in the accompanying technical blog article, highlight the comparative throughput (requests per second) for various HTTP operations. Generally, Hono on Bun demonstrates significantly higher throughput, especially for GET, PUT, and DELETE operations, aligning with claims of Bun's performance advantages and Hono's lightweight design.

For a detailed analysis of the benchmark results and conclusions, please refer to the blog article:
[Link to Blog Article Here (Benchmarking API Performance)](https://aymenbenzlaouia.vercel.app/blog/benchmarking-express-hono)

---

**Note:** The performance observed can vary based on hardware, operating system, Node.js/Bun/framework versions, and the specific application logic. This benchmark provides a point of comparison under the described conditions.
