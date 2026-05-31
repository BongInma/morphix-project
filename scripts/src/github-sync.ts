import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

async function getGitHubUser() {
  const res = await connectors.proxy("github", "/user", { method: "GET" });
  if (!res.ok) throw new Error(`GitHub user error: ${res.status}`);
  return res.json();
}

async function createRepo(owner: string, name: string, description: string) {
  const res = await connectors.proxy("github", "/user/repos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      private: false,
      auto_init: true,
    }),
  });
  if (res.status === 422) {
    console.log(`Repository "${name}" already exists. Using existing repo.`);
    return { name, existing: true };
  }
  if (!res.ok) throw new Error(`Create repo failed: ${res.status}`);
  return res.json();
}

async function main() {
  const user = await getGitHubUser();
  const repoName = process.env.GITHUB_REPO || "morphix-project";
  const repoDesc = process.env.GITHUB_REPO_DESC || "OmniDiff B2B GPU compute marketplace";

  console.log(`GitHub user: ${user.login}`);
  const repo = await createRepo(user.login, repoName, repoDesc);
  console.log("Repo:", repo);

  const remoteUrl = `https://github.com/${user.login}/${repoName}.git`;
  console.log(`\nNext steps to push manually:\n`);
  console.log(`  git remote add origin ${remoteUrl}`);
  console.log(`  git branch -M main`);
  console.log(`  git push -u origin main`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
