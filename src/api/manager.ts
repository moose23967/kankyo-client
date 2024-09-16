export interface Meta {
  information: {
    url: string;
  };
  token?: string;
}

interface ManagerOptions {
  meta: Meta;
  endpoint: string;
}

interface RequestOptions {
  url?: string;
  method: 'GET' | 'POST' | 'DELETE';
  fragments?: Array<{
    name: string;
    value: string;
  }>;
}

interface ApiError {
  name: 'Error';
  message: string;
}

export class Manager {
  options: ManagerOptions;

  constructor(options: ManagerOptions) {
    this.options = options;
  }

  async request<T>(options: RequestOptions): Promise<T>;
  async request(options: RequestOptions): Promise<void>;
  async request<T = void>(
    options: RequestOptions,
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  ): Promise<T | void> {
    const fragments = options.fragments;

    let body: FormData | undefined;

    if (fragments) {
      const formData = new FormData();

      for (const fragment of fragments) {
        formData.append(fragment.name, fragment.value);
      }

      body = formData;
    }

    const response = await fetch(
      `${this.options.meta.information.url}/${this.options.endpoint}${options.url || ''}`,
      {
        body,
        headers: {
          // biome-ignore lint/style/useNamingConvention: <explanation>
          Authorization: `Bearer ${this.options.meta.token}`,
        },
        method: options.method,
      },
    );

    const json = await response.json();

    if (response.status !== 200) {
      throw new Error((json as ApiError).message);
    }

    return json as T;
  }
}
