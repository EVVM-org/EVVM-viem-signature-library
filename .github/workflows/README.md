# GitHub Workflows Documentation

## Overview

This directory contains GitHub Actions workflows for automated publishing and release management of the EVVM TypeScript Library.

## Workflows

### `publish.yml` - Automated Publishing and Release Workflow

This workflow automatically handles version bumping, npm publishing, and GitHub release creation when code is pushed to the `main` branch.

#### Workflow Features

- **Automatic Version Bumping**: Based on commit message prefixes
- **NPM Publishing**: Publishes to npm registry with public access
- **GitHub Releases**: Creates releases with version tags and changelogs
- **Git Tagging**: Automatically creates and pushes version tags

#### Version Bumping Strategy

The workflow determines version increments based on commit message prefixes:

| Commit Prefix | Version Bump | Example Change |
|---------------|--------------|----------------|
| `MAJOR:` | Major version | 1.0.0 → 2.0.0 |
| `MINOR:` | Minor version | 1.0.0 → 1.1.0 |
| Any other | Patch version | 1.0.0 → 1.0.1 |

#### Usage Examples

##### Major Version Release
```bash
git commit -m "MAJOR: breaking API changes for signature validation"
git push origin main
# Results in: 1.0.0 → 2.0.0
```

##### Minor Version Release
```bash
git commit -m "MINOR: add new generic signature builder functionality"
git push origin main
# Results in: 1.0.0 → 1.1.0
```

##### Patch Version Release (Default)
```bash
git commit -m "fix: correct validation bug in name service"
git commit -m "feat: improve error handling"
git commit -m "docs: update README examples"
git commit -m "refactor: optimize hash utilities"
git push origin main
# Results in: 1.0.0 → 1.0.1
```

#### Workflow Steps

1. **Code Checkout**: Fetches repository with full history
2. **Node.js Setup**: Configures Node.js 20.x environment
3. **Dependency Installation**: Runs `npm ci` to install dependencies
4. **Build Process**: Executes `npm run build` to compile the library
5. **Git Configuration**: Sets up GitHub Actions bot for commits
6. **Change Detection**: Collects commit messages since last release
7. **Version Bump Detection**: Analyzes commits to determine version increment
8. **Version Update**: Updates `package.json` with new version
9. **Version Commit**: Commits the version change back to repository
10. **NPM Publishing**: Publishes package to npm registry
11. **Git Tagging**: Creates and pushes version tag
12. **GitHub Release**: Creates release with changelog and version info

#### Release Format

The workflow creates GitHub releases with the following format:

```
Release v1.0.7
Auto-generated release for version v1.0.7

## Changes:

- fix: update license from MIT to EVVM-NONCOMMERCIAL-1.0
- feat: add new signature validation method
- docs: update README with examples
```

#### Required Secrets

The workflow requires the following repository secrets:

- `NPM_TOKEN`: Token for publishing to npm registry
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions (no setup needed)

#### Permissions

The workflow requires the following permissions:
- `contents: write` - For creating releases and pushing commits
- `packages: write` - For npm publishing

## Setup Instructions

### 1. NPM Token Setup

1. Log in to your npm account
2. Go to **Access Tokens** in your account settings
3. Create a new **Automation** token
4. Add the token as `NPM_TOKEN` in your repository secrets

### 2. Repository Configuration

Ensure your repository has:
- Branch protection rules for `main` branch (optional but recommended)
- Required status checks configured (optional)
- Proper collaborator permissions

### 3. Package.json Configuration

Verify your `package.json` includes:
```json
{
  "name": "@evvm/viem-signature-library",
  "version": "1.0.0",
  "scripts": {
    "build": "rollup -c"
  }
}
```

## Troubleshooting

### Common Issues

#### Workflow Fails on NPM Publish
- **Cause**: Invalid or expired NPM_TOKEN
- **Solution**: Generate new npm token and update repository secret

#### Version Bump Not Working
- **Cause**: Incorrect commit message format
- **Solution**: Ensure commit messages start with `MAJOR:` or `MINOR:` for non-patch versions

#### Build Failure
- **Cause**: TypeScript compilation errors or missing dependencies
- **Solution**: Run `npm run build` locally to identify and fix issues

#### Permission Denied Errors
- **Cause**: Insufficient repository permissions
- **Solution**: Verify workflow permissions in repository settings

### Manual Override

If you need to manually trigger a specific version:

1. Temporarily modify the workflow file
2. Or use npm version commands locally:
   ```bash
   npm version patch|minor|major
   git push origin main --tags
   ```

## Best Practices

### Commit Message Guidelines

- Use clear, descriptive commit messages
- Only use `MAJOR:` for breaking changes that affect API compatibility
- Use `MINOR:` for new features that don't break existing functionality
- Regular commits (fixes, docs, refactoring) will automatically be patch versions

### Testing Before Release

- Always test your changes locally before pushing to main
- Consider using feature branches and pull requests for larger changes
- Run `npm run build` and `npm test` locally before committing

### Version Strategy

- **Patch (1.0.x)**: Bug fixes, documentation updates, internal improvements
- **Minor (1.x.0)**: New features, additional functionality, non-breaking enhancements
- **Major (x.0.0)**: Breaking changes, API modifications, architectural changes

## Monitoring

### Workflow Status

Monitor workflow execution:
- Check the **Actions** tab in your GitHub repository
- Review build logs for any failures
- Verify successful npm publication in the npm registry
- Confirm GitHub releases are created properly

### Release Verification

After each release:
1. Verify the new version appears on npm: `npm view @evvm/viem-signature-library`
2. Check that the GitHub release includes proper changelog
3. Confirm the version tag exists in the repository
4. Test installation: `npm install @evvm/viem-signature-library@latest`