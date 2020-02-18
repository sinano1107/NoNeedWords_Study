class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string :e
      t.string :j

      t.timestamps
    end
  end
end
