import { Request, Response } from 'express'
import {GraphQLClient} from "graphql-request";

export function shortcutCreatorAction({ sdk }: { sdk: GraphQLClient }) {
  return (req: Request, res: Response) => {

  }
}
