export type IPhoto = {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
};

export type PostPhotoOutput = {
  post_author: number;
  post_type: string;
  post_status: string;
  post_title: string;
  post_content: string;
  meta_input: Record<string, unknown>;
  files: {
    img: {
      name: string;
      full_path: string;
      type: string;
      tmp_name: string;
      error: number;
      size: number;
    };
  };
};
