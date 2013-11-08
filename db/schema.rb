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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131108122344) do

  create_table "clicks_counter", :force => true do |t|
    t.integer "first",  :default => 0, :null => false
    t.integer "second", :default => 0, :null => false
    t.integer "third",  :default => 0, :null => false
    t.integer "forth",  :default => 0, :null => false
    t.integer "fifth",  :default => 0, :null => false
    t.integer "sixth",  :default => 0, :null => false
  end

end
