RSpec.shared_examples 'a failure' do
  it 'has a failed result' do
    expect(result).to be_a_failure
  end
end

RSpec.shared_examples 'a success' do
  it 'has a failed result' do
    expect(result).to be_a_success
  end
end
