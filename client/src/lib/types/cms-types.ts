type GetsType<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends "get"
  ? { id: string } & DateType & Required<P>
  : T extends "gets"
    ? GetsType<{ id: string } & DateType & Required<P>>
    : Partial<DateType> & (T extends "patch" ? Partial<P> : P);

export type works<T = "get"> = Structure<
  T,
  {
    /**
     * メインビジュアル
     */
    visualMain?: string;
    /**
     * タイトル
     */
    title: string;
    /**
     * 公開日時
     */
    releaseDate: string;
    /**
     * クライアント名
     */
    clientName?: string;
    /**
     * 説明文
     */
    description?: string;
    /**
     * サブビジュアル
     */
    visualSub?: works_imgList[];
    /**
     * 本文
     */
    content?: any;
    /**
     * OGP 画像
     */
    ogpImg?: { url: string; width: number; height: number };
    /**
     * ホバー時の動画
     */
    videoOnHover?: string;
    /**
     * ファイルアップロード
     */
    uploadedFileListMap?: any;
  }
>;

type works_imgList = {
  fieldId: "imgList";
  /**
   * 複数画像
   */
  imgList: any;
};
export type info<T = "get"> = Structure<
  T,
  {
    /**
     * ファイルアップロード
     */
    uploadedFileListMap?: any;
    /**
     * ファイルアップロード (テスト)
     */
    uploadedFileListMapT?: any;
  }
>;

export type blogs<T = "get"> = Structure<
  T,
  {
    /**
     * タイトル
     */
    title: string;
    /**
     * OGP 画像
     */
    ogpImg?: { url: string; width: number; height: number };
    /**
     * 本文
     */
    content: any;
    /**
     * ファイルアップロード
     */
    uploadedFileListMap?: any;
  }
>;

export type EndPoints = {
  get: {
    works: works<"get">;
    info: info<"get">;
    blogs: blogs<"get">;
  };
  gets: {
    works: works<"gets">;
    info: info<"gets">;
    blogs: blogs<"gets">;
  };
  post: {
    works: works<"post">;
    info: info<"post">;
    blogs: blogs<"post">;
  };
  put: {
    works: works<"put">;
    info: info<"put">;
    blogs: blogs<"put">;
  };
  patch: {
    works: works<"patch">;
    info: info<"patch">;
    blogs: blogs<"patch">;
  };
};
