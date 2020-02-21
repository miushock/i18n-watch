# i18n-watch

## Getting started.

#### 全局安装
```shell script
npm install -g i18n-watch
```

#### 新建工作目录 并进入
```shell script
mkdir [dir] && cd [dir]
```

#### 初始化项目
```shell script
i18n-watch init --token=[github_access_token] --user_name=[github_user_name] --email=[github_user_email]
```

#### 添加追踪项目
```shell script
i18n-watch track [repo_url] --i18n_path=[i18n_path] --branch=[checkout_branch]
```

#### 移除追踪项目
```shell script
i18n-watch untrack [repo_dir]
```

#### 远程同步项目
```shell script
i18n-watch sync [repo_dir]
```
