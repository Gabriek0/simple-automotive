interface IUserMapResponseDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  driver_license: string;
  avatar_url(): string;
}

export { IUserMapResponseDTO };
