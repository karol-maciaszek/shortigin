import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "shortcut_visits" */
  delete_shortcut_visits?: Maybe<Shortcut_Visits_Mutation_Response>;
  /** delete single row from the table: "shortcut_visits" */
  delete_shortcut_visits_by_pk?: Maybe<Shortcut_Visits>;
  /** delete data from the table: "shortcuts" */
  delete_shortcuts?: Maybe<Shortcuts_Mutation_Response>;
  /** delete single row from the table: "shortcuts" */
  delete_shortcuts_by_pk?: Maybe<Shortcuts>;
  /** insert data into the table: "shortcut_visits" */
  insert_shortcut_visits?: Maybe<Shortcut_Visits_Mutation_Response>;
  /** insert a single row into the table: "shortcut_visits" */
  insert_shortcut_visits_one?: Maybe<Shortcut_Visits>;
  /** insert data into the table: "shortcuts" */
  insert_shortcuts?: Maybe<Shortcuts_Mutation_Response>;
  /** insert a single row into the table: "shortcuts" */
  insert_shortcuts_one?: Maybe<Shortcuts>;
  /** update data of the table: "shortcut_visits" */
  update_shortcut_visits?: Maybe<Shortcut_Visits_Mutation_Response>;
  /** update single row of the table: "shortcut_visits" */
  update_shortcut_visits_by_pk?: Maybe<Shortcut_Visits>;
  /** update multiples rows of table: "shortcut_visits" */
  update_shortcut_visits_many?: Maybe<Array<Maybe<Shortcut_Visits_Mutation_Response>>>;
  /** update data of the table: "shortcuts" */
  update_shortcuts?: Maybe<Shortcuts_Mutation_Response>;
  /** update single row of the table: "shortcuts" */
  update_shortcuts_by_pk?: Maybe<Shortcuts>;
  /** update multiples rows of table: "shortcuts" */
  update_shortcuts_many?: Maybe<Array<Maybe<Shortcuts_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Shortcut_VisitsArgs = {
  where: Shortcut_Visits_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shortcut_Visits_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_ShortcutsArgs = {
  where: Shortcuts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shortcuts_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootInsert_Shortcut_VisitsArgs = {
  objects: Array<Shortcut_Visits_Insert_Input>;
  on_conflict?: InputMaybe<Shortcut_Visits_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shortcut_Visits_OneArgs = {
  object: Shortcut_Visits_Insert_Input;
  on_conflict?: InputMaybe<Shortcut_Visits_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ShortcutsArgs = {
  objects: Array<Shortcuts_Insert_Input>;
  on_conflict?: InputMaybe<Shortcuts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shortcuts_OneArgs = {
  object: Shortcuts_Insert_Input;
  on_conflict?: InputMaybe<Shortcuts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Shortcut_VisitsArgs = {
  _inc?: InputMaybe<Shortcut_Visits_Inc_Input>;
  _set?: InputMaybe<Shortcut_Visits_Set_Input>;
  where: Shortcut_Visits_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shortcut_Visits_By_PkArgs = {
  _inc?: InputMaybe<Shortcut_Visits_Inc_Input>;
  _set?: InputMaybe<Shortcut_Visits_Set_Input>;
  pk_columns: Shortcut_Visits_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shortcut_Visits_ManyArgs = {
  updates: Array<Shortcut_Visits_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ShortcutsArgs = {
  _inc?: InputMaybe<Shortcuts_Inc_Input>;
  _set?: InputMaybe<Shortcuts_Set_Input>;
  where: Shortcuts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shortcuts_By_PkArgs = {
  _inc?: InputMaybe<Shortcuts_Inc_Input>;
  _set?: InputMaybe<Shortcuts_Set_Input>;
  pk_columns: Shortcuts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shortcuts_ManyArgs = {
  updates: Array<Shortcuts_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "shortcut_visits" */
  shortcut_visits: Array<Shortcut_Visits>;
  /** fetch aggregated fields from the table: "shortcut_visits" */
  shortcut_visits_aggregate: Shortcut_Visits_Aggregate;
  /** fetch data from the table: "shortcut_visits" using primary key columns */
  shortcut_visits_by_pk?: Maybe<Shortcut_Visits>;
  /** fetch data from the table: "shortcuts" */
  shortcuts: Array<Shortcuts>;
  /** fetch aggregated fields from the table: "shortcuts" */
  shortcuts_aggregate: Shortcuts_Aggregate;
  /** fetch data from the table: "shortcuts" using primary key columns */
  shortcuts_by_pk?: Maybe<Shortcuts>;
};


export type Query_RootShortcut_VisitsArgs = {
  distinct_on?: InputMaybe<Array<Shortcut_Visits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcut_Visits_Order_By>>;
  where?: InputMaybe<Shortcut_Visits_Bool_Exp>;
};


export type Query_RootShortcut_Visits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shortcut_Visits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcut_Visits_Order_By>>;
  where?: InputMaybe<Shortcut_Visits_Bool_Exp>;
};


export type Query_RootShortcut_Visits_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootShortcutsArgs = {
  distinct_on?: InputMaybe<Array<Shortcuts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcuts_Order_By>>;
  where?: InputMaybe<Shortcuts_Bool_Exp>;
};


export type Query_RootShortcuts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shortcuts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcuts_Order_By>>;
  where?: InputMaybe<Shortcuts_Bool_Exp>;
};


export type Query_RootShortcuts_By_PkArgs = {
  id: Scalars['bigint'];
};

/** columns and relationships of "shortcut_visits" */
export type Shortcut_Visits = {
  __typename?: 'shortcut_visits';
  createdAt: Scalars['timestamptz'];
  id: Scalars['bigint'];
  ip: Scalars['String'];
  shortcutId: Scalars['bigint'];
};

/** aggregated selection of "shortcut_visits" */
export type Shortcut_Visits_Aggregate = {
  __typename?: 'shortcut_visits_aggregate';
  aggregate?: Maybe<Shortcut_Visits_Aggregate_Fields>;
  nodes: Array<Shortcut_Visits>;
};

/** aggregate fields of "shortcut_visits" */
export type Shortcut_Visits_Aggregate_Fields = {
  __typename?: 'shortcut_visits_aggregate_fields';
  avg?: Maybe<Shortcut_Visits_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Shortcut_Visits_Max_Fields>;
  min?: Maybe<Shortcut_Visits_Min_Fields>;
  stddev?: Maybe<Shortcut_Visits_Stddev_Fields>;
  stddev_pop?: Maybe<Shortcut_Visits_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shortcut_Visits_Stddev_Samp_Fields>;
  sum?: Maybe<Shortcut_Visits_Sum_Fields>;
  var_pop?: Maybe<Shortcut_Visits_Var_Pop_Fields>;
  var_samp?: Maybe<Shortcut_Visits_Var_Samp_Fields>;
  variance?: Maybe<Shortcut_Visits_Variance_Fields>;
};


/** aggregate fields of "shortcut_visits" */
export type Shortcut_Visits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shortcut_Visits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Shortcut_Visits_Avg_Fields = {
  __typename?: 'shortcut_visits_avg_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "shortcut_visits". All fields are combined with a logical 'AND'. */
export type Shortcut_Visits_Bool_Exp = {
  _and?: InputMaybe<Array<Shortcut_Visits_Bool_Exp>>;
  _not?: InputMaybe<Shortcut_Visits_Bool_Exp>;
  _or?: InputMaybe<Array<Shortcut_Visits_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  ip?: InputMaybe<String_Comparison_Exp>;
  shortcutId?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "shortcut_visits" */
export enum Shortcut_Visits_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShortcutVisitsPkey = 'shortcut_visits_pkey'
}

/** input type for incrementing numeric columns in table "shortcut_visits" */
export type Shortcut_Visits_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  shortcutId?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "shortcut_visits" */
export type Shortcut_Visits_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  ip?: InputMaybe<Scalars['String']>;
  shortcutId?: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type Shortcut_Visits_Max_Fields = {
  __typename?: 'shortcut_visits_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  ip?: Maybe<Scalars['String']>;
  shortcutId?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type Shortcut_Visits_Min_Fields = {
  __typename?: 'shortcut_visits_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  ip?: Maybe<Scalars['String']>;
  shortcutId?: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "shortcut_visits" */
export type Shortcut_Visits_Mutation_Response = {
  __typename?: 'shortcut_visits_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Shortcut_Visits>;
};

/** on_conflict condition type for table "shortcut_visits" */
export type Shortcut_Visits_On_Conflict = {
  constraint: Shortcut_Visits_Constraint;
  update_columns?: Array<Shortcut_Visits_Update_Column>;
  where?: InputMaybe<Shortcut_Visits_Bool_Exp>;
};

/** Ordering options when selecting data from "shortcut_visits". */
export type Shortcut_Visits_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ip?: InputMaybe<Order_By>;
  shortcutId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shortcut_visits */
export type Shortcut_Visits_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "shortcut_visits" */
export enum Shortcut_Visits_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Ip = 'ip',
  /** column name */
  ShortcutId = 'shortcutId'
}

/** input type for updating data in table "shortcut_visits" */
export type Shortcut_Visits_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  ip?: InputMaybe<Scalars['String']>;
  shortcutId?: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type Shortcut_Visits_Stddev_Fields = {
  __typename?: 'shortcut_visits_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Shortcut_Visits_Stddev_Pop_Fields = {
  __typename?: 'shortcut_visits_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Shortcut_Visits_Stddev_Samp_Fields = {
  __typename?: 'shortcut_visits_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "shortcut_visits" */
export type Shortcut_Visits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shortcut_Visits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shortcut_Visits_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  ip?: InputMaybe<Scalars['String']>;
  shortcutId?: InputMaybe<Scalars['bigint']>;
};

/** aggregate sum on columns */
export type Shortcut_Visits_Sum_Fields = {
  __typename?: 'shortcut_visits_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  shortcutId?: Maybe<Scalars['bigint']>;
};

/** update columns of table "shortcut_visits" */
export enum Shortcut_Visits_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Ip = 'ip',
  /** column name */
  ShortcutId = 'shortcutId'
}

export type Shortcut_Visits_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shortcut_Visits_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shortcut_Visits_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shortcut_Visits_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shortcut_Visits_Var_Pop_Fields = {
  __typename?: 'shortcut_visits_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Shortcut_Visits_Var_Samp_Fields = {
  __typename?: 'shortcut_visits_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Shortcut_Visits_Variance_Fields = {
  __typename?: 'shortcut_visits_variance_fields';
  id?: Maybe<Scalars['Float']>;
  shortcutId?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "shortcuts" */
export type Shortcuts = {
  __typename?: 'shortcuts';
  createdAt: Scalars['timestamptz'];
  id: Scalars['bigint'];
  slug?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  userId: Scalars['String'];
};

/** aggregated selection of "shortcuts" */
export type Shortcuts_Aggregate = {
  __typename?: 'shortcuts_aggregate';
  aggregate?: Maybe<Shortcuts_Aggregate_Fields>;
  nodes: Array<Shortcuts>;
};

/** aggregate fields of "shortcuts" */
export type Shortcuts_Aggregate_Fields = {
  __typename?: 'shortcuts_aggregate_fields';
  avg?: Maybe<Shortcuts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Shortcuts_Max_Fields>;
  min?: Maybe<Shortcuts_Min_Fields>;
  stddev?: Maybe<Shortcuts_Stddev_Fields>;
  stddev_pop?: Maybe<Shortcuts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shortcuts_Stddev_Samp_Fields>;
  sum?: Maybe<Shortcuts_Sum_Fields>;
  var_pop?: Maybe<Shortcuts_Var_Pop_Fields>;
  var_samp?: Maybe<Shortcuts_Var_Samp_Fields>;
  variance?: Maybe<Shortcuts_Variance_Fields>;
};


/** aggregate fields of "shortcuts" */
export type Shortcuts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Shortcuts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Shortcuts_Avg_Fields = {
  __typename?: 'shortcuts_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "shortcuts". All fields are combined with a logical 'AND'. */
export type Shortcuts_Bool_Exp = {
  _and?: InputMaybe<Array<Shortcuts_Bool_Exp>>;
  _not?: InputMaybe<Shortcuts_Bool_Exp>;
  _or?: InputMaybe<Array<Shortcuts_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "shortcuts" */
export enum Shortcuts_Constraint {
  /** unique or primary key constraint on columns "id" */
  ShortcutsPkey = 'shortcuts_pkey',
  /** unique or primary key constraint on columns "slug" */
  ShortcutsSlugKey = 'shortcuts_slug_key'
}

/** input type for incrementing numeric columns in table "shortcuts" */
export type Shortcuts_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "shortcuts" */
export type Shortcuts_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  slug?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Shortcuts_Max_Fields = {
  __typename?: 'shortcuts_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  slug?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Shortcuts_Min_Fields = {
  __typename?: 'shortcuts_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  slug?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "shortcuts" */
export type Shortcuts_Mutation_Response = {
  __typename?: 'shortcuts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Shortcuts>;
};

/** on_conflict condition type for table "shortcuts" */
export type Shortcuts_On_Conflict = {
  constraint: Shortcuts_Constraint;
  update_columns?: Array<Shortcuts_Update_Column>;
  where?: InputMaybe<Shortcuts_Bool_Exp>;
};

/** Ordering options when selecting data from "shortcuts". */
export type Shortcuts_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shortcuts */
export type Shortcuts_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "shortcuts" */
export enum Shortcuts_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "shortcuts" */
export type Shortcuts_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  slug?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Shortcuts_Stddev_Fields = {
  __typename?: 'shortcuts_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Shortcuts_Stddev_Pop_Fields = {
  __typename?: 'shortcuts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Shortcuts_Stddev_Samp_Fields = {
  __typename?: 'shortcuts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "shortcuts" */
export type Shortcuts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Shortcuts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shortcuts_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  slug?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Shortcuts_Sum_Fields = {
  __typename?: 'shortcuts_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "shortcuts" */
export enum Shortcuts_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'userId'
}

export type Shortcuts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Shortcuts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Shortcuts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Shortcuts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shortcuts_Var_Pop_Fields = {
  __typename?: 'shortcuts_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Shortcuts_Var_Samp_Fields = {
  __typename?: 'shortcuts_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Shortcuts_Variance_Fields = {
  __typename?: 'shortcuts_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "shortcut_visits" */
  shortcut_visits: Array<Shortcut_Visits>;
  /** fetch aggregated fields from the table: "shortcut_visits" */
  shortcut_visits_aggregate: Shortcut_Visits_Aggregate;
  /** fetch data from the table: "shortcut_visits" using primary key columns */
  shortcut_visits_by_pk?: Maybe<Shortcut_Visits>;
  /** fetch data from the table in a streaming manner: "shortcut_visits" */
  shortcut_visits_stream: Array<Shortcut_Visits>;
  /** fetch data from the table: "shortcuts" */
  shortcuts: Array<Shortcuts>;
  /** fetch aggregated fields from the table: "shortcuts" */
  shortcuts_aggregate: Shortcuts_Aggregate;
  /** fetch data from the table: "shortcuts" using primary key columns */
  shortcuts_by_pk?: Maybe<Shortcuts>;
  /** fetch data from the table in a streaming manner: "shortcuts" */
  shortcuts_stream: Array<Shortcuts>;
};


export type Subscription_RootShortcut_VisitsArgs = {
  distinct_on?: InputMaybe<Array<Shortcut_Visits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcut_Visits_Order_By>>;
  where?: InputMaybe<Shortcut_Visits_Bool_Exp>;
};


export type Subscription_RootShortcut_Visits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shortcut_Visits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcut_Visits_Order_By>>;
  where?: InputMaybe<Shortcut_Visits_Bool_Exp>;
};


export type Subscription_RootShortcut_Visits_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootShortcut_Visits_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Shortcut_Visits_Stream_Cursor_Input>>;
  where?: InputMaybe<Shortcut_Visits_Bool_Exp>;
};


export type Subscription_RootShortcutsArgs = {
  distinct_on?: InputMaybe<Array<Shortcuts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcuts_Order_By>>;
  where?: InputMaybe<Shortcuts_Bool_Exp>;
};


export type Subscription_RootShortcuts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Shortcuts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Shortcuts_Order_By>>;
  where?: InputMaybe<Shortcuts_Bool_Exp>;
};


export type Subscription_RootShortcuts_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootShortcuts_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Shortcuts_Stream_Cursor_Input>>;
  where?: InputMaybe<Shortcuts_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type UpdateShortcutSlugMutationVariables = Exact<{
  id: Scalars['bigint'];
  slug: Scalars['String'];
}>;


export type UpdateShortcutSlugMutation = { __typename?: 'mutation_root', update_shortcuts_by_pk?: { __typename?: 'shortcuts', id: any } | null };


export const UpdateShortcutSlugDocument = gql`
    mutation UpdateShortcutSlug($id: bigint!, $slug: String!) {
  update_shortcuts_by_pk(pk_columns: {id: $id}, _set: {slug: $slug}) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UpdateShortcutSlug(variables: UpdateShortcutSlugMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateShortcutSlugMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateShortcutSlugMutation>(UpdateShortcutSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateShortcutSlug', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;