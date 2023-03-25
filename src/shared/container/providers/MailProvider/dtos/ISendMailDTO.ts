interface ISendMailDTO {
  to: string;
  path: string;
  subject: string;
  variables: unknown;
}

export { ISendMailDTO };
