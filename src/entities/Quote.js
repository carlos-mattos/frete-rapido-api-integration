import { EntitySchema } from "typeorm";

export const Quote = new EntitySchema({
  name: "Quote",
  columns: {
    id: {
      type: String,
      primary: true,
      nullable: false,
    },
    request_id: {
      type: String,
      length: 255,
      nullable: false,
    },
    registered_number_shipper: {
      type: String,
      length: 255,
      nullable: false,
    },
    registered_number_dispatcher: {
      type: String,
      length: 255,
      nullable: false,
    },
    zipcode_origin: {
      type: Number,
      nullable: false,
    },
    offers: {
      type: "json",
      nullable: true,
    },
    volumes: {
      type: "json",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
