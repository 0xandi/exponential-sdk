import Conf from 'conf';

export interface ExponentialConfig {
  apiUrl: string;
  token: string;
  tokenExpiry?: string;
  defaultWorkspaceId?: string;
  defaultWorkspaceSlug?: string;
}

const schema = {
  apiUrl: {
    type: 'string' as const,
    default: '',
  },
  token: {
    type: 'string' as const,
    default: '',
  },
  tokenExpiry: {
    type: 'string' as const,
    default: '',
  },
  defaultWorkspaceId: {
    type: 'string' as const,
    default: '',
  },
  defaultWorkspaceSlug: {
    type: 'string' as const,
    default: '',
  },
};

function createStore(projectName: string) {
  return new Conf<ExponentialConfig>({
    projectName,
    schema,
  });
}

function readConfig(store: Conf<ExponentialConfig>): ExponentialConfig {
  return {
    apiUrl: store.get('apiUrl'),
    token: store.get('token'),
    tokenExpiry: store.get('tokenExpiry'),
    defaultWorkspaceId: store.get('defaultWorkspaceId'),
    defaultWorkspaceSlug: store.get('defaultWorkspaceSlug'),
  };
}

function writeConfig(store: Conf<ExponentialConfig>, values: Partial<ExponentialConfig>): void {
  if (values.apiUrl !== undefined) store.set('apiUrl', values.apiUrl);
  if (values.token !== undefined) store.set('token', values.token);
  if (values.tokenExpiry !== undefined) store.set('tokenExpiry', values.tokenExpiry);
  if (values.defaultWorkspaceId !== undefined) store.set('defaultWorkspaceId', values.defaultWorkspaceId);
  if (values.defaultWorkspaceSlug !== undefined) store.set('defaultWorkspaceSlug', values.defaultWorkspaceSlug);
}

const defaultStore = createStore('exponential-sdk');

export function createConfigStore(options?: { projectName?: string }) {
  const store = createStore(options?.projectName ?? 'exponential-sdk');

  return {
    loadConfig: () => readConfig(store),
    saveConfig: (values: Partial<ExponentialConfig>) => writeConfig(store, values),
    clearConfig: () => store.clear(),
    isAuthenticated: () => {
      const cfg = readConfig(store);
      return Boolean(cfg.token && cfg.apiUrl);
    },
    getConfigPath: () => store.path,
  };
}

export function loadConfig(): ExponentialConfig {
  return readConfig(defaultStore);
}

export function saveConfig(values: Partial<ExponentialConfig>): void {
  writeConfig(defaultStore, values);
}

export function clearConfig(): void {
  defaultStore.clear();
}

export function isAuthenticated(): boolean {
  const cfg = readConfig(defaultStore);
  return Boolean(cfg.token && cfg.apiUrl);
}

export function getConfigPath(): string {
  return defaultStore.path;
}
