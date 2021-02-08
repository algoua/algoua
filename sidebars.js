module.exports = {
  algorithmsSidebar: [
    {
      type: 'doc',
      id: 'algorithms/intro',
    },
    {
      type: 'category',
      label: 'Алгебра',
      items: [
        'algorithms/algebra/binary_pow',
        'algorithms/algebra/euclid_algorithm',
        'algorithms/algebra/euler_function',
        'algorithms/algebra/extended_euclid_algorithm',
      ],
    },
    {
      type: 'category',
      label: 'Графи',
      items: [
        'algorithms/graphs/dfs',
        'algorithms/graphs/bfs',
        'algorithms/graphs/topological_sort',
      ],
    },
  ],
  coursesSidebar: [
    {
      type: 'doc',
      id: 'courses/intro',
    },
  ],
};
