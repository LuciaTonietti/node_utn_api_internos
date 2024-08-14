import { connect } from "mongoose";
import 'dotenv/config';

const db_uri = process.env.db_uri;
connect(db_uri);