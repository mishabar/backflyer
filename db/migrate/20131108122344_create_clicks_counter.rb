class CreateClicksCounter < ActiveRecord::Migration
  def up
    create_table :clicks_counter do |t|
      t.integer :first, :default => 0, :null => false
      t.integer :second, :default => 0, :null => false
      t.integer :third, :default => 0, :null => false
      t.integer :forth, :default => 0, :null => false
      t.integer :fifth, :default => 0, :null => false
      t.integer :sixth, :default => 0, :null => false
    end
  end

  def down
    drop_table :clicks_counter
  end
end
