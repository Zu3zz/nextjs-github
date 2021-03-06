/**
 * @author 3zz.
 * @data 2020/10/19
 */
import LRU from 'lru-cache';

const REPO_CACHE = new LRU({
  maxAge: 1000 * 60 * 60,
});

export function cache(repo) {
  const full_name = repo.full_name;
  REPO_CACHE.set(full_name, repo);
}

export function get(full_name) {
  return REPO_CACHE.get(full_name);
}

export function cacheRepos(repos) {
  if(repos && Array.isArray(repos)) {
    repos.forEach(repo => cache(repo));
  }
}
