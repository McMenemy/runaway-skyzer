# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160114221634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "records", force: :cascade do |t|
    t.string   "name",                   null: false
    t.integer  "value",      default: 0, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "records", ["name"], name: "index_records_on_name", using: :btree

  create_table "scores", force: :cascade do |t|
    t.string   "username",                          null: false
    t.integer  "score",                             null: false
    t.date     "date",       default: '2016-01-14', null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  add_index "scores", ["date"], name: "index_scores_on_date", using: :btree
  add_index "scores", ["score"], name: "index_scores_on_score", using: :btree

end